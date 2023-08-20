import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification !== null) {
    if (notification.error) {
      return <Alert variant="danger">{notification.message}</Alert>
    } else {
      return <Alert variant="success">{notification.message}</Alert>
    }
  }

  return null
}

export default Notification
