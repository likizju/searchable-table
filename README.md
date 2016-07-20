 [![Build Status](https://travis-ci.org/Aconex/searchable-table.svg)](https://travis-ci.org/Aconex/searchable-table)

# searchable-table

Create search capability on HTML tables

## Usage

### Basic general search
By default a general input search is appended to the header/top of the table.

```html
  <table class="your-selector">
    ...
  </table>
```

```javascript
$('table.your-selector').toSearchable();
```

### Column search
If `enableGeneralSearch` is disabled a search input will be added to each column header and filter is applied to the column content.

```html
  <table class="your-selector">
    ...
  </table>
```

```javascript
$('table.your-selector').toSearchable({enableGeneralSearch: false});
```

### Fixed 
Use the class `searchable-fixed-row` to mark a row as fixed.

```html
  <table class="your-selector">
    <tr class="searchable-fixed-row">
    ...
    </tr>
    ...
  </table>
```

### Custom header style
Add `headerTRStyle` property when applying `toSearchable`

```javascript
  $('table.your-selector').toSearchable({headerTRStyle: 'my-custom-style'});
```

## Maintainers 

Xiaojun Ren <nicholas.x.ren@gmail.com>

Marcelo Garcia de Oliveira <moliveira@aconex.com>
