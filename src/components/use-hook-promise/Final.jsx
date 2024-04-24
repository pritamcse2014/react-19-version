import { Suspense, useState, use } from "react";

const fetchMessage = async () => {
    return new Promise( (resolve) => {
        setTimeout( () => {
            resolve("🚀");
        }, 1000 );
    } );
}

const MessageOutput = ({messagePromise}) => {
    const messageContent = use(messagePromise);
    return <p className="text-xl text-center">Here is the message : {messageContent}</p>
}

function MessageContainer({messagePromise}) {
    return(
        <Suspense fallback={<p className="text-xl text-center">⌛ Downloading Message....</p>}>
            <MessageOutput messagePromise = {messagePromise} />
        </Suspense>
    )
}

export default function Message() {
    const [show, setShow] = useState(false);
    const [messagePromise, setMessagePromise] = useState(null);

    const download = () => {
        setMessagePromise(fetchMessage());
        setShow(true);
    }

    return show ? (
        <MessageContainer messagePromise = {messagePromise} />
    ) : (
            <div className="text-center">
                <button onClick={download} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download message</button>
            </div>
        );
}
