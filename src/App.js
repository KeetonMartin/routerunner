import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';

import { Theme } from 'react-daisyui'

function App() {
  return (
    <Router>
      <div calssName="flex flex-col justify-between h-screen">
        <Theme dataTheme='business'>
          <Navbar />
          <Hero />
          {/* <CityPicker /> */}
        </Theme>

        {/* <main className="container mx-auto px-3 pb-12">Content</main> */}
      </div>
    </Router>
  );
}
export default App;
