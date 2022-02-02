import mainReducer from '../client/reducers/mainReducer.js';


describe('MainReducer', () => {
    let state;

  beforeEach(() => {
      state = {
          searchResult: [],
          favorites: [],
          savedResults: [],
          favsPageOn: false,
          commentsOn: false,
          firstRender: true,
          comments: [],
        };
      });

    describe('default state', () => {
        it('should return a default state when given an undefined input', () => {
            expect(subject(undefined, { type: undefined })).toEqual(state);
        });
    });

    describe('ADD_FAV', () => {
        const action = {
            type: 'ADD_FAV',
            payload: 'Wendy\'s' 
        }

        it ('adds a favorite', () => {
            const { favorites } = subject(state, action);
            expect(favorites[0]).toEqual({
                favorites: 'Wendy\'s'
            });
        });
    })

    describe('TOGGLE_FAVS_PAGE', () => {
        const action = {
            type: 'TOGGLE_FAVS_PAGE'
        }

        const state = {
            ...state,
            searchResult: ['Yelp'],
            savedResults: ['Help'],
            favorites: ['Mexico']
        }

        it('updates favs page boolean from false to true', () => {
            const newState = subject(state, action)
            expect(newState.favsPageOn).toEqual(true)
        })

        it('makes savedResults equal to previous searchResults', () => {
            const newState = subject(state, action)
            expect(newState.savedResults).toEqual(['Yelp'])
        })

        it('makes searchResults equal to previous stateFavorites', () => {
            const newState = subject(state, action);
            expect(newState.searchresults).toEqual(['Mexico'])
        })

        it('updates favs page boolean from true to false', () => {
            const { favsPageOn } = subject(state, action)
            expect(favsPageOn).not.toEqual(false)
        })

        it('savedResults is not strictly equal to previous searchResults', () => {
            const { searchResults, savedResults } = subject(state, action)
            expect(savedResults).not.toBe(searchResults)
        })

        it('searchResults is not strictly equal to previous stateFavorites', () => {
            const { searchResults, favorites } = subject(state, action)
            expect(searchResults).not.toBe(favorites)
        })

    })

    describe('ADD_COMMENT', () => {
        const action = {
            type: 'ADD_COMMENT',
            payload: { number = 1, comment = 'Hello Earthlings'}
        }

        it('pushes new comment to comments array', () => {
            const { comments } = subject(state, action);
            expect(comments[0]).toEqual(action.payload)
        })
    })

    describe('TOGGLE_COMMENTS', () => {
        const action = {
            type: 'TOGGLE_COMMENTS'
        }
        
        it('updates favs page boolean from false to true', () => {
            const { commentsOn } = subject(state, action);
            expect(commentsOn).toBeTruthy();
        });
        
        it('updates favs page boolean from true to false', () => {
            const { commentsOn } = subject(state, action);
            expect(commentsOn).toBeFalsy();
        });
        
        it('makes a deep copy of comments', () => {
            const savedComments = state.comments;
            const { comments } = subject(state, action);
            expect(savedComments).toBe(comments);
        });
        
    });
});