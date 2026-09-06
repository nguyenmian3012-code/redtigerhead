# Behavior inventory — `/dsKhach`

| Surface | Source behavior | Clone behavior |
|---|---|---|
| Main navigation | Dropdowns open on hover | Hover and keyboard-focus dropdowns on desktop; collapsible list on mobile |
| Search | Filters the customer list | Case-insensitive in-memory filtering across name, phone and organization |
| Face filter | Radio choices: all/registered/unregistered | Filters in-memory rows and updates checked state |
| Add customer | Opens a large two-column modal | Opens matching dialog; validation requires customer name; saves only for the current browser session |
| Import file | Opens a two-step import modal | Opens matching dialog; local filename is displayed, but bytes are not uploaded |
| Export | Downloads file | Exports currently visible synthetic rows as UTF-8 CSV |
| Row select | Header and row checkboxes | Local selection state only |
| Table | Sticky header in scrolling white card | Same, with responsive horizontal overflow |

## Safety behavior

- No copied personal records, face images, face templates, credentials, cookies or vendor secrets.
- No request to `192.168.1.227` from the hosted browser.
- No direct SQL access and no device control.
- All visible demo records must be obviously synthetic.

## Known source-observation gap

The source browser surface did not expose viewport resizing, so a mobile source screenshot could not be captured. Mobile behavior is derived from the source CSS breakpoints (`992 px` and `768 px`) and is implemented as a usable responsive adaptation.

