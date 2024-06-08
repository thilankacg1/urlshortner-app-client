import axios from 'axios';
import * as React from 'react';
import { serverUrl } from '../../helpers/Constants';

interface IFormContainerProps {
    updateReloadState: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
    const { updateReloadState } = props;
    const [fullurl, setFullurl] = React.useState<string>("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`${serverUrl}/shortUrl`, {
                fullUrl: fullurl,
            });
            setFullurl("");
            updateReloadState();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container mx-auto p-2">
            <div className="bg-banner my-8 rounded-xl bg-cover bg-center">
                <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50'>
                    <h2 className='text-white text-4xl text-center pb-4'> URL Shortner</h2>
                    <p className='text-white text-center pb-2 text-xl font-extralight'>Paste your link to shorten it</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                                    urlshortner.link /
                                </div>
                                <input type="text" placeholder='add yiur url' required
                                    className="block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullurl(e.target.value)} />
                                <button
                                    type="submit"
                                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                    Shorten URL
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
