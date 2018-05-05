## React Font It 

This package is a rewrite of this one [react-font-face](https://github.com/ojdx/react-font-face)
It is package for your React components in order to use custom fonts, icon fonts or Google imported fonts.
It uses [react-helmet](https://github.com/nfl/react-helmet) to inject the font-face declarations into the head of your app entry point.  

### Usage

Install and save to your environment using the terminal. 

```bash
npm install react-font-it -S
```

Import the package in your app. 


Wrap your component in the higher order component wherever you export the component.  You will also need to pass in an config object using Google Fonts or your own font files or both.

```js
import ReactFontIt from 'react-font-it'
// SHOWS IMPORT OF LOCAL FILE
import bangersFont from './Bangers-Regular.ttf'

// BUILD YOUR STYLES
const styles = {
  main: {
    margin: 15,
    lineHeight: 1.4,
    fontFamily: 'Bangers',
  },
  google1: {
    fontFamily: 'Pangolin',
  },
  google2: {
    fontFamily: 'Roboto Mono',
  },
};

// THE ACTUAL COMPONENT we want to 'font'
class ExampleComponent extends Component {
  render() {
    return (
      <div style={styles.main}>
        <p>Custom font from main style.</p>
        <p style={ styles.google1 }>Custom Font from first google style.</p>
        <p style={ styles.google2 }>Custom Font from second google style.</p>
      </div>
    );
  }
}

const fontConfig = {
  google: [
    'Pangolin',
    'Roboto Mono',
    
    // MORE FONTS IN THE ARRAY
    // Note this has to be an array
    ...
  ],
  file: [
    {
      fontFamily: 'Bangers',
      fontStyle:  'normal',
      fontWeight: 400,
      unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215',
      file: bangersFont,
      fontType: 'truetype',
      fileLocal: 'Bangers Regular'
    },
    
    // MORE FONTS IN THE ARRAY
    // Note this has to be an array
    ...
  ],
}

// WRAP THE EXPORTED COMPONENT 
export default ReactFontIt(ExampleComponent, fontConfig);
```




### Development

Contributions are welcome.

```bash
$ git clone https://github.com/iuliaL/react-font-it.git
$ npm i
$ npm run watch
```
