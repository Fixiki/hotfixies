export const CHANGE_SELECTED = 'CHANGE_SELECTED';

const initialState = {
  list: [
    {
      id: 1,
      name: 'sample dataset #1 name',
      description: 'dataset description',
    },
    {
      id: 2,
      name: 'sample dataset #2 name',
      description: 'dataset description',
    },
    {
      id: 3,
      name: 'sample dataset #3 name',
      description: 'dataset description',
    },
    {
      id: 4,
      name: 'sample dataset #4 name',
      description: 'dataset description',
    },
    {
      id: 5,
      name: 'sample dataset #5 name',
      description: 'dataset description',
      unavailable: true,
    },
    {
      id: 6,
      name: 'sample dataset #6 name',
      description: 'dataset description',
      unavailable: true,
    },
  ],
  selectedIndex: 0,
};

export default function time(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_SELECTED:
      return {
        ...state,
        selectedIndex: data,
      };
    default:
      return state;
  }
}

export function changeSelected(index) {
  return {
    type: CHANGE_SELECTED,
    data: index,
  }
}
