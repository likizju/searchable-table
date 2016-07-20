'use strict';

describe("Searchable Table with Sub Headers", function () {

    beforeEach(function () {
        loadFixtures("search-by-column.html");
        $("table").toSearchable();
    });


    it("should filter by one column", function () {
        filterBy({"First Name": "Mark"});
        expect(getVisibleRows().length).toBe(1);
    });

    it("should filter by multiple column", function () {
        filterBy({"First Name": "r", "Last Name": 'o'});
        expect(getVisibleRows().length).toBe(1);
    });

    function getVisibleRows() {
        return $("table tbody tr:visible");
    }

    function filterBy(criteria) {
        Object.keys(criteria).forEach(function (key) {
            filter(key, criteria[key]);
        });

        function filter(column, text) {
            var inputFilter = $("table th:contains(" + column + ") .searchable-column-filter");
            inputFilter.val(text);
            inputFilter.trigger('keyup');
        }
    }
});
