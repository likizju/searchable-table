'use strict';

describe("Searchable Table with Sub Headers", function () {

    beforeEach(function () {
        loadFixtures("table-with-sub-headers.html");
    });

    describe("enabled", function () {
        beforeEach(function () {
            $("table").toSearchable();
        });

        it("should filter with header text return empty result", function () {
            filterBy('toyota');
            expect(getVisibleRows().length).toBe(0);
            expect(getFixedRows().length).toBe(2);
        });

        it("should filter by input text and keep 'searchable-fixed-row' rows ", function () {
            filterBy('prius');
            expect(getVisibleRows().length).toBe(1);
            expect(getVisibleRowsText()).toContain("Prius c i-Tech");
            expect(getVisibleRowsText()).toContain("$55");

            expect(getFixedRows().length).toBe(2);
        });
    });

    describe("not enabled", function () {
        it("should not add a filter input", function () {
            expect(getFilterInput()).not.toBeVisible();
        });
    });

    function getFilterInput() {
        return $('input.searchable-general-filter:first');
    }

    function getVisibleRows() {
        return $("table tbody tr.item:visible");
    }

    function getVisibleRowsText() {
        return getVisibleRows().text();
    }

    function getFixedRows() {
        return $("table tbody tr.searchable-fixed-row:visible");
    }

    function filterBy(text) {
        getFilterInput().val(text);
        getFilterInput().trigger("keyup");
    }

});
