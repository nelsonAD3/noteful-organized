import React, {Component} from 'react';
import config from '../config'
import ApiContext from '../ApiContext'
// import { findNote, findFolder } from '../notes-helpers'
// import { format } from 'date-fns'


export default class AddNote extends Component {

    static contextType = ApiContext;
    

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          nameValid: false,
          content: '',
          folderName: '',
          folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1", //default
          validationMessages: {
            name: ''
          }
        }
      }
    
    updateName(name) {
        this.setState({name});
      }
      
    updateContent(content) {
        this.setState({content});
      }

    updateFolderName(folderName) {
        const { notes, folders, } = this.context
        console.log(folders)
        let folderId = folders.find(function(i) {
            return i.name === folderName
        })
        this.setState({ ...this.state, folderId, folderName });
      }

  


    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name;
        const content = this.state.content;
        const folderId = this.state.folderId.id;
        const date = new Date().toJSON(); 
        console.log('Name: ', name);

        fetch(`${config.API_ENDPOINT}/notes/`, 
        {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                  'name': `${name}`,
                  'content': `${content}`,
                  'folderId': `${folderId}`,
                  'modified': `${date}`
              })
        })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(() => {
              console.log('check if note added')
            })
            .catch(error => {
              console.error({ error })
            })
      }

    renderOptions(){
        const { notes, folders, } = this.context
        const options = folders.map(folder => folder.name)

        return(
            <>
                {options.map(opt => (
                <option >{opt}</option>
                ))}
            </>
        )   
        }

      

    render(){  

        return(
            <div>
            <form className="addfolder" onSubmit={e => this.handleSubmit(e)}>
                <h2>Select Folder</h2>
                <select name="folder-name" id="folder-name" onChange={e => this.updateFolderName(e.target.value)}>
                    {this.renderOptions()}
                </select>
                <input required type="text" className="add_note_name" defaultValue="Note Name"
           name="note-name" id="note-name" onChange={e => this.updateName(e.target.value)}>
                </input>
                <input required size="35" type="text" className="add_content" defaultValue="Content Here"
           name="content" id="content" onChange={e => this.updateContent(e.target.value)}>
                </input>
                <button>Submit
                </button>
            </form>
            </div>
        );
    }

}