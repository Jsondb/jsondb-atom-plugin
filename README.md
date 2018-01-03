## json-atom-plugin

A Jsondb data file in its entirety is not  a valid JSON string, hence you cannot edit the complete Jsondb data file in a standard JSON conscious text editor. This makes it difficult manully edit the file if the schema is complex.

However each row in a Jsondb data file (upto the LF) is expected to be a valid JSON document. This plugin when installed along with the [Atom Editor](https://atom.io/) can help with manual editing of Jsondb data file.

Note: MongoDB import files have a similar problem in manually editing, this plugin solves that problem too.

## Usage

- Install [Atom Editor](https://atom.io/)
- Search and Install the 'json-atom-plugin' plugin
- Activate the Plugin by selecting the Menu: ```Packages > json-atom-plugin > Toggle``` this will add a extra sub pane to the right.
- Select the Jsondb text file you want to edit, and click on a line. The right pane will attempt to parse the line on which you have the cursor, if its a valid JSON it will show it in the right pane in a pretty indented form.

WIP: As of now the right pane is read only any changes made to it do not reflect back in the main document
