export const addNote = ({id, title, content}) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            id,
            title,
            content,
        }
    }
}

export const delNote = (id) => {
    return {
      type: 'DEL_NOTE',
      payload: {
        ID: id,
      },
    };
}

export const editedNote = (id, content) => {
  return {
    type: 'EDITED_NOTE',
    payload: {
      id,
      content,
    }
  }
}