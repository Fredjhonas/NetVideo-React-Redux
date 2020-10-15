import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './reducers';

import App from './routes/App';

/*const initialState = {
  categoryList: [],
  suggestionList: [],
};*/

const initialState = {
  user: {},
  playing: {},
  mylist: [],
  trends: [
    {
      id: 1,
      slug: 'tvshow-2',
      title: 'In the Dark',
      type: 'Scripted',
      language: 'English',
      year: 2009,
      contentRating: '16+',
      duration: 164,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 2,
      slug: 'tvshow-3',
      title: 'Instinct',
      type: 'Adventure',
      language: 'English',
      year: 2002,
      contentRating: '16+',
      duration: 137,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 3,
      slug: 'tvshow-4',
      title: 'Grand Hotel',
      type: 'Comedy',
      language: 'English',
      year: 2014,
      contentRating: '16+',
      duration: 163,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/4BgSWFMW2MJ0dT5metLzsRWO7IJ.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 4,
      slug: 'tvshow-5',
      title: 'Stargate Atlantis',
      type: 'Scripted',
      language: 'English',
      year: 2014,
      contentRating: '16+',
      duration: 194,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/x0fojycYFbT0eqXXbEO6aDqkalX.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 5,
      slug: 'tvshow-6',
      title: 'Final Space',
      type: 'Scripted',
      language: 'English',
      year: 2017,
      contentRating: '16+',
      duration: 124,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/riYInlsq2kf1AWoGm80JQW5dLKp.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 6,
      slug: 'tvshow-7',
      title: 'The InBetween',
      type: 'Drama',
      language: 'English',
      year: 2011,
      contentRating: '16+',
      duration: 179,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 7,
      slug: 'tvshow-8',
      title: 'Stargate Atlantis',
      type: 'Action',
      language: 'English',
      year: 2012,
      contentRating: '16+',
      duration: 148,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 8,
      slug: 'tvshow-9',
      title: 'Alien Highway',
      type: 'Action',
      language: 'English',
      year: 2019,
      contentRating: '16+',
      duration: 128,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  ],
  originals: [
    {
      id: 9,
      slug: 'tvshow-8',
      title: 'Stargate Atlantis',
      type: 'Action',
      language: 'English',
      year: 2012,
      contentRating: '16+',
      duration: 148,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 10,
      slug: 'tvshow-9',
      title: 'Alien Highway',
      type: 'Action',
      language: 'English',
      year: 2019,
      contentRating: '16+',
      duration: 128,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 11,
      slug: 'tvshow-10',
      title: 'Elementary',
      type: 'Animation',
      language: 'English',
      year: 2011,
      contentRating: '16+',
      duration: 346,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/sfeQTIRkJjWt8IPDSBcPqkrcaas.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 12,
      slug: 'tvshow-11',
      title: 'Strange Angel',
      type: 'War',
      language: 'English',
      year: 2015,
      contentRating: '16+',
      duration: 226,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/mi5VN4ww0JZgRFJIaPxxTGKjUg7.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 13,
      slug: 'tvshow-12',
      title: 'Private Eyes',
      type: 'Comedy',
      language: 'English',
      year: 2018,
      contentRating: '16+',
      duration: 190,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/enFfoFd3TYs6ttTxrBIfmecQPnz.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 14,
      slug: 'tvshow-13',
      title: 'NCIS: Los Angeles',
      type: 'Drama',
      language: 'English',
      year: 2010,
      contentRating: '16+',
      duration: 160,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/91bUbxcOvTinqrPLrnGHlWYVy9J.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 15,
      slug: 'tvshow-11',
      title: 'Strange Angel',
      type: 'War',
      language: 'English',
      year: 2015,
      contentRating: '16+',
      duration: 226,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/mi5VN4ww0JZgRFJIaPxxTGKjUg7.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      id: 16,
      slug: 'tvshow-13',
      title: 'NCIS: Los Angeles',
      type: 'Drama',
      language: 'English',
      year: 2010,
      contentRating: '16+',
      duration: 160,
      cover: '//image.tmdb.org/t/p/w300_and_h450_bestv2/91bUbxcOvTinqrPLrnGHlWYVy9J.jpg',
      description: 'Vestibulum ac est lacinia nisi venenatis tristique',
      source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  ],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
