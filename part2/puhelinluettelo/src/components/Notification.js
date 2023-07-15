const Notification = ({ message, errorMessage }) => {
    if (message !== null) {
        return(
            <div className="successful">
                {message}
            </div>
        )
    }

    if (errorMessage !== null) {
        return(
            <div className="error">
                {errorMessage}
            </div>
        )
    }

    return null 
}

export default Notification