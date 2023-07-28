// const initialState = [];

const initialState = [
  { id: 0, title: 'Meeting with Eric', content: 'Discussed project updates' },
  { id: 1, title: 'Shopping List', content: 'Milk, eggs, bread, and fruits' },
  { id: 2, title: 'Movie Recommendations', content: 'Inception, The Shawshank Redemption' },
  { id: 3, title: 'Recipe for Pasta', content: 'Ingredients: pasta, sauce, cheese' },
  { id: 4, title: 'Gym Workout Plan', content: 'Cardio and strength training' },
  { id: 5, title: 'Travel Bucket List', content: 'Destinations: Paris, Tokyo, Bali' },
  { id: 6, title: 'Book Recommendations', content: 'To Kill a Mockingbird, 1984' },
  { id: 7, title: 'Project Deadline', content: 'Complete task by Friday' },
  { id: 8, title: 'Fitness Goals', content: 'Run 5 kilometers in under 30 minutes' },
  { id: 9, title: 'Vacation Planning', content: 'Research flights and accommodations' }
];

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload];
    case 'DEL_NOTE':
      return state.filter(note => note.id !== action.payload.id);
    case 'EDITED_NOTE':
      return state.map(note => {
        if (note.id === action.payload.id) {
          return { ...note, content: action.payload.content };
        }
        return note;
      });
    default:
      return state;
  }
};

export default noteReducer;
