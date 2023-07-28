import notebook from './Images/notebook.png';
import notelist from './Images/check-list.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addNote, delNote, editedNote } from './features/actions/index';


const App = () => {

  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [id, setID] = useState(0);
  const [errorMsg, setErrorMSG] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [editNote, setEditNote] = useState('');
  const [editNoteID, setEditNoteID] = useState(null);

  const notes = useSelector(state => state.noteReducer);

  const handleSubmit = () => {

    if (title === '') {
      setErrorMSG('Title should not be empty.');
      setTimeout(() => {
        setErrorMSG('')
      }, 3000);
    } else if (note === '') {
      setErrorMSG('Note should not be empty.');
      setTimeout(() => {
        setErrorMSG('')
      }, 3000);
    } else {
      dispatch(addNote({ id, title, content: note }))
      setID(id + 1);
    }
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleBody = (e) => {
    setNote(e.target.value)
  }
  const handleDel = (id) => {
    dispatch(delNote(id))
    console.log(id)
  }
  const handleEditNote = (e) => {
    setEditNote(e.target.value)
  }
  const handleNote = (note) => {
    setEditMode(true);
    setEditNoteID(note.id);
    setEditNote(note.content);
  };
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditNoteID(null);
    setEditNote('');
    setErrorMSG('');
  };
  const handleSaveEdit = () => {
    setEditMode(false);
    setEditNoteID(null);
    dispatch(editedNote(editNoteID, editNote));
    setEditMode('');
    setErrorMSG('');
  }
  return (
    <>

      <div className="noteApp" title='Created by Sibghat on 19th July 2023 - Using React, Redux, Bootstrap'>

        <h1 className="display-2">Add Note
          <img src={notebook} alt="A Notebook" className='notebook' />
        </h1>

        <div className="mb-1">
          <label htmlFor="basic-url" className="form-label">Your Note Title</label>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">Title:</span>
            <input required type="text" value={title} onChange={handleTitle} className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" />
          </div>
        </div>

        <div className="input-group">
          <span className="input-group-text">Note:</span>
          <textarea required className="form-control" aria-label="With textarea" value={note} onChange={handleBody}></textarea>
        </div>

        {!editMode && errorMsg && (
          <p style={{ 'color': 'red', 'textAlign': 'center' }}>{errorMsg}</p>
        )}
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Add Note</button>
      </div>

      <div className="noteApp-2" style={{ 'marginBottom': '50px' }}>
        <h1 className="display-4" style={{ textAlign: 'center' }}>
          Your Note List - <img src={notelist} alt="A Notelist" className="notebook" />
        </h1>
        <ol type='I'>
          {notes.map((note, index) => (
            <div className="accordion accordion-flush" id={`accordionFlushExample-${index}`} key={note.id}>
              <div className="accordion-item" key={note.id}>
                <li>
                  <h2 className="accordion-header" key={note.id}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse-${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse-${index}`}
                      style={{ 'marginBottom': '10px' }}
                    >
                      {note.title}
                    </button>
                  </h2>
                </li>
                <div
                  id={`flush-collapse-${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent={`#accordionFlushExample-${index}`}
                >
                  <div className="accordion-body acc-body">
                    {editNoteID !== note.id && note.content}
                    {editMode && note.id === editNoteID && (
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon3">
                          Edit:
                        </span>
                        <input
                          required
                          type="text"
                          value={editNote}
                          onChange={handleEditNote}
                          className="form-control"
                          id="basic-url"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                        &nbsp;
                        &nbsp;
                      </div>
                    )}
                    <div>
                      {note.id !== editNoteID && (
                        <i
                          className="fa-regular fa-pen-to-square edit"
                          onClick={() => {
                            if (editMode) {
                              setErrorMSG('You are already editing a note.');
                              setTimeout(() => {
                                setErrorMSG('')
                              }, 3000);
                            } else {
                              handleNote(note)
                            }
                          }}
                        ></i>
                      )}
                      &nbsp;&nbsp;
                      {note.id !== editNoteID && (
                        <i className="fa-solid fa-trash-can del" onClick={() => handleDel(note.id)}></i>
                      )}
                    </div>

                    {note.id === editNoteID && (
                      <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center' }}>
                        <i className="fa-solid fa-check check" onClick={handleSaveEdit}></i>
                        &nbsp;&nbsp;
                        <i className="fa-solid fa-xmark xmark" onClick={handleCancelEdit}></i>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
          {editMode && errorMsg !== '' && (
            <p style={{ 'color': 'red', 'textAlign': 'center' }}>{errorMsg}</p>
          )}

        </ol>
        {notes.length === 0 && (
          <div className="alert alert-danger" role="alert" style={{ textAlign: 'center' }}>
            No notes to show.
          </div>
        )}
      </div>


    </>
  );
}

export default App;