'use strict';
jQuery.fn.toSearchable = function (customConfig) {

    var defaults = {
        headerTRStyle: "",
        enableGeneralSearch: true,
        headerColspan: null
    };

    var config = $.extend({}, defaults, customConfig);

    var SEARCHABLE_COLUMN_CLASS = "searchable-column-header";
    var table = $(this);
    var $rows = table.find('tbody tr');

    function onlyTextNode(i, e) {
        return e.nodeType === 3;
    }

    function onlyNotTextNode(i, e) {
        return e.nodeType !== 3;
    }

    function onlyTextFromNode(node) {
        var text = "";
        node.contents().filter(onlyTextNode).each(function (i, e) {
            text += e.textContent;
        });
        return getCleanUpText(text);
    }

    function getTextFromNode(node) {
        var text = onlyTextFromNode(node);

        node.contents().filter(onlyNotTextNode).each(function (i, c) {
            var child = $(c);
            var tagName = child.prop("tagName");
            if (child.children().length && tagName !== "SELECT") {
                text += getTextFromNode(child);
            } else {
                tagName = child.prop("tagName");
                if (tagName === "SELECT") {
                    text += getCleanUpText(child.find("option:selected").text());
                } else if (tagName === "INPUT") {
                    text += getCleanUpText(child.val());
                } else {
                    text += getCleanUpText(child.text());
                }
            }
        });

        return text;
    }

    function getSearchableTextFrom(elem) {
        return getTextFromNode(elem);
    }

    function getCleanUpText(text) {
        return text.replace(/\s+/g, ' ').toLowerCase();
    }

    function getGeneralSearch() {
        return $("<div class='searchable-general-search-container'>" +
            "<input type='text' class='searchable-filter searchable-general-filter'/>" +
            "</div>");
    }

    function getColumnSearch() {
        return $("<div class='searchable-column-search-container'>" +
            "<input type='text' class='searchable-filter searchable-column-filter'/>" +
            "</div>");
    }

    function calculateColspan() {
        var colspan = table.find("thead tr:first-child th").length;
        if (colspan < 1) {
            var firstRow = table.find("tr:nth-child(1) th");
            if (firstRow.length === 0) {
                firstRow = table.find("tr:nth-child(1) td");
            }
            firstRow.each(function (i, e) {
                colspan += $(e).attr("colspan") ? ($(e).attr("colspan")) : 1;
            });
        }
        return colspan;
    }

    function getColspan() {
        return config.headerColspan || calculateColspan();
    }

    function addGeneralSearch() {
        if (config.enableGeneralSearch) {
            var thead = table.find('thead');
            if (thead.length === 0) {
                thead = table;
            }
            var colspan = getColspan();
            thead.prepend($("<tr class='" + config.headerTRStyle + "'><th class='searchable-general-search'></th></<tr>"));
            if (colspan) {
                $('.searchable-general-search').attr("colspan", colspan);
            }
            $('.searchable-general-search').append(getGeneralSearch());
        }
    }

    function addColumnSearches() {
        table.find('thead tr th.' + SEARCHABLE_COLUMN_CLASS).append(getColumnSearch());
    }

    function filterByCriteria(text, criteria) {
        if (criteria && criteria.length) {
            return !!~text.indexOf(criteria);
        }
        return true;
    }

    function notFilteredBy(filters) {
        return function (td, i) {
            var text = getSearchableTextFrom($(td));
            return !filterByCriteria(text, filters[i]);
        };
    }

    function getFilters() {
        var filters = {};
        filters.supersearch = getCleanUpText($.trim($('input.searchable-general-filter').val()));
        table.find('thead tr th.' + SEARCHABLE_COLUMN_CLASS).each(function (i, column) {
            filters[i] = getCleanUpText($(column).find('input.searchable-column-filter').val());
        });
        return filters;
    }

    function isFixedRow(row) {
        return row.hasClass("searchable-fixed-row");
    }

    function hasAnyNotCriteriaMatchingColumn(row, filters) {
        return row.find("td").toArray().some(notFilteredBy(filters));
    }

    function addSearchListener() {
        var filter = function () {
            var filters = getFilters();
            $rows.show().filter(function () {
                var row = $(this);
                if (isFixedRow(row)) {
                    return false;
                }
                return hasAnyNotCriteriaMatchingColumn(row, filters) || !filterByCriteria(getSearchableTextFrom(row), filters.supersearch);
            }).hide();
        };
        table.find('.searchable-filter').keyup(filter);
    }

    addGeneralSearch();
    addColumnSearches();
    addSearchListener();

};
