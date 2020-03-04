This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Restaurant Review Project

### Technologies: JavaScript, HTML5, CSS3, React, Redux, Redux Form, Redux Selectors, Bootstrap 4, Google Maps and Google Places APIs

### Description
This project is from scratch rewritten Project 7 - OpenClassrooms Front End Development Path using advantages of Redux along with React.

### Requirements:

1. A Google Maps map loaded with the Google Maps API
2. A list of restaurants on the right side of the page that are within the area displayed on the map
3. Add a review about an existing restaurant
4. Add a restaurant by clicking on a specific place on the map
5. Show the Google Street View photo via the corresponding API

All added places and reviews persist during the session with the help of Redux state. Sorting and filtering places are also enabled.

To view the application click the following link

https://explore-nearby-restaurants.netlify.com/

## Installation

Clone the directory

```
> git clone https://github.com/gordana16/restaurants-review-react-redux.git
```
or download this application by clicking "Clone or download" and then choose "Download ZIP". Once downloaded extract the zip file to your local computer.

Install dependencies by running the next command from the project directory: 

```
> npm install
```

To start application in the development mode, you can run the following command in the project directory:

```
> npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

In order to build the application for production to the `build` folder run the next command:

```
> npm run build
```

This application is deployed on Netlify by specifying `<npm run build>` as build command.

## Code Example

Rendering AddPlaceForm component (redux-form) inside Google Maps InfoWindow:

```javascript
createInfoWindow(event, map) {
    const { latLng } = event;
    const infoWindow = google.getInfoWindow();
    infoWindow.setOptions({
      content: '<div id="iw-place"/>',
      position: { lat: latLng.lat(), lng: latLng.lng() }
    });
    const store = this.context.store;

    infoWindow.addListener("domready", () => {
      this.props.resetAddPlaceForm();
      ReactDOM.render(
        <Provider store={store}>
          <div className="info-window">
            <h4>Add new place: </h4>
            <AddPlaceForm onSubmit={this.handleSubmitPlace} />
          </div>
        </Provider>,
        document.getElementById("iw-place")
      );
    });

    infoWindow.open(map);
  }
};
```




