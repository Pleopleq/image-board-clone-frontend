import React from 'react'

const NewCommentToUpdate = ({ onSubmitNew, onSubmitUpdate, isUpdate, newCommentValue, commentUpdateValue , setMessage, setMessageToUpdate }) => {

    if(!isUpdate){
      return (
      <form className="m-2" onSubmit={onSubmitNew}>     
        <input 
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
        type="text" 
        placeholder="Add comment"
        name="message"
        value={newCommentValue}
        onChange={({target}) => setMessage(target.value)}
        />
      </form> 
    )
    }
    return (
    <form className="m-2" onSubmit={onSubmitUpdate}>     
        <input 
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
        type="text"
        name="message"
        value={commentUpdateValue}
        onChange={({target}) => setMessageToUpdate(target.value)}
        />
    </form>
    )
  }

export default NewCommentToUpdate