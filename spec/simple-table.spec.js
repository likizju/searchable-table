'use strict';

describe("Searchable Table", function () {

    beforeEach(function () {
        loadFixtures("simple-table.html");
    });

    describe("enabled", function () {
        beforeEach(function () {
            $("table").toSearchable();
        });

        it("should add a filter input", function () {
            expect(getFilterInput()).toBeVisible();
        });

        it("should filter by input text", function () {
            filterBy('banana');
            expect(getVisibleRows().length).toBe(1);
            expect(getVisibleRowsText()).toContain("Banana");
            expect(getVisibleRowsText()).toContain("Yellow");
        });

        it("filter should be case insensitive", function () {
            filterBy('GrApE');
            expect(getVisibleRows().length).toBe(1);
            expect(getVisibleRowsText()).toContain("Grape");
            expect(getVisibleRowsText()).toContain("Purple");
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
        return $("table tbody tr:visible");
    }

    function getVisibleRowsText() {
        return getVisibleRows().text();
    }

    function filterBy(text) {
        getFilterInput().val(text);
        getFilterInput().trigger("keyup");
    }

});
