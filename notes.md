# Notes from the developer

## About Section

1. The proportion of the profile photos is 8:10.

## Publications Section

1. In `public/files/publications/`, publications are categorized by their types, e.g. journal, conference, poster, etc. Each category is a folder.

## Projects Section

1. In `public/files/projects/`, projects are categorized by their years, e.g. 2021.

2. Rules for generating names of project folders:

   - Take the `title` in `public/files/projects.csv`
   - Remove all special characters
   - Replace all ' ' with '-'

## Highlights Section

1. There are 3 types of highlights:

   - achievement
   - work
   - life

   Make sure you enter correct `type` in `public/files/highlights.csv`.

2. `year` and `month` in `public/files/highlights.csv` are required. `day` can be left blank. If blank, the code will fill them with 0 (for the convinience of sorting).

3. The default number of highlights shown is 5. Every time the **_SHOW MORE_** button is clicked, the number is incremented by 5. When you toggle the type, the number is reset to 5.

## Images

1. The format of images is **_jpg_**.
2. Compress images to make the webpage load faster. [Here](https://tinyjpg.com/) is an online compression tool.

## Mapbox Resources

1. [Mapbox API](https://docs.mapbox.com/mapbox-gl-js/api/map/)
2. [React wrapper for Mapbox](https://visgl.github.io/react-map-gl/)
3. [ReactMapboxGL](https://github.com/alex3165/react-mapbox-gl/blob/HEAD/docs/API.md)
4. [How to display Markers on a Mapbox Map in React](https://mariestarck.com/how-to-display-markers-on-a-mapbox-map-mapbox-react-tutorial-part-2/)
5. [Maki (Mapbox custom markers)](https://labs.mapbox.com/maki-icons/editor/)
6. [Geocoding API Playground](https://docs.mapbox.com/playground/geocoding/)
