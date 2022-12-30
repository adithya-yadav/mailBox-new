import classes from './NoMessage.module.css'

const NoMessage = ()=>{
    return (
        <div className={classes.nomessage}>
            <h1 className={classes.img}>📭</h1>
            <h2>No Mail yet !!!</h2>
        </div>
    )
}
export default NoMessage;