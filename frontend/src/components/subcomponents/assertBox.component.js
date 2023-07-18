export default function AssertBox({onConfirm, onCancel, message}){
    return (
        <div className="modals">
            <div className="modal-content">
                <div className="modal-text">
                    {message}
                </div>
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={onConfirm} style={{width:'100%', marginBottom:'10px'}}>
                            Ja
                        </button>                        
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={onCancel} style={{width:'100%', marginBottom:'10px'}}>
                            Nein
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    );
  };