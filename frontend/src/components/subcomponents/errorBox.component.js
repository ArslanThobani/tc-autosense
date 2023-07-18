export default function ErrorBox({onConfirm,  message}){
    return (
        <div className="modals">
            <div className="modal-content">
                <div className="modal-text">
                    {message}
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={onConfirm} style={{width:'100%', marginBottom:'10px'}}>
                            Ok
                        </button>                        
                    </div>
                </div>
            </div>
        </div>
    );
  };