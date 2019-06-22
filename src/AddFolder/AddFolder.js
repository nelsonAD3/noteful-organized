import React, {Component} from 'react';
import config from '../config'

export default class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          nameValid: false,
          validationMessages: {
            name: ''
          }
        }
      }
    
    updateName(name) {
        this.setState({name});
      }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name;
        console.log('Name: ', name);

        //potentially submit these values to the server here
        fetch(`${config.API_ENDPOINT}/folders/`, 
        {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                  'name': `${name}`,
              })
        })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(() => {
              console.log('check if folder added')
              // allow parent to perform extra behaviour
            //   this.props.onDeleteNote(noteId)
            })
            .catch(error => {
              console.error({ error })
            })
      }

    render(){
        return(
            <div>
            <form className="addfolder" onSubmit={e => this.handleSubmit(e)}>
                <h2>Folder Name</h2>
                <input required type="text" className="add_folder_input"
           name="folder-name" id="folder-name" onChange={e => this.updateName(e.target.value)}>
                
                </input >
                <button>

                </button>
            </form>
            </div>
        );
    }

}