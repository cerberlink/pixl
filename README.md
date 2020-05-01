## PIXL

In this milestone, you group will implement a web service for the sample data from PIXL and a baseline visualization of the data.

- Use Node.js to set up a http webserver. (5 pt) :white_check_mark:

- The webserver uses MVC architecture. (10 pt) :white_check_mark:

- The webserver uses the CSV file as its data source. (5 pt)

- The webserver uses a type of heatmap (element map) in D3.js to show the data in a browser. (5 pt)

- A user can switch views between different chemical element used in the CSV file. (10 pt)

- The heatmap (element map) should include

  - chart title (1 pt)

  - axis title (2 pt)

  - legend (2 pt)

  - color scale and corresponding value range (2 pt)

  - labels (value) of a specific data point (3 pt)

In this milestone 2, you group will implement a second view based on the web service your group created for the sample data from PIXL. The purpose of the views is to assist scientists to better understand the relationship of PIXL data and textures on the context image.

The second view should,

- Allow a user to select certain area/points in the PIXL data. (7 pt)

And,

- Show relationship between PIXL data and the context image. (7 pt)

And,

- Provide at least 2 analysis based on statistical learning or machine learning, for example, (14 pt)

  - Relationship of all PIXL data of one element from one detector.
  - Relationship of selected points in terms of their geochemical similarity.
  - Relative weight between 2+ different elements in a selected area.
  - Relationship of PIXL data between different detectors.

## How to use

1. Clone/Download the repo in your terminal.
2. Run **npm install**.
3. Run **npm start** (Make sure you are in same directory folder)to load up the local dev server port 9000. (http://127.0.0.1:9000/).

Some basic Git commands are:

| Command      | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| `git status` | List all _new or modified_ files                                             |
| `git add`    | Incrementally _add_ changes to the index before using the commit command     |
| `git commit` | Save your changes to the local repository (type -m "brief description here") |
| `git diff`   | Show file differences that **haven't been** staged                           |
