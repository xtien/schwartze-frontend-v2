import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router";
import strings from "./strings.tsx";
import {isAdmin} from "./service/AuthenticationService.tsx";
import twitli from './images/logo.png'
import Landing from "./Landing.tsx";
import Letters from "./Letters.tsx";
import LetterPage from "./LetterPage.tsx";
import TextPage from "./TextPage.tsx";
import People from "./People.tsx";
import PersonPage from "./PersonPage.tsx";
import LocationPage from "./LocationPage.tsx";
import Locations from "./Locations.tsx";
import ReferencesPage from "./ReferencesPage.tsx";
import Topics from "./Topics.tsx";
import {About} from "./About.tsx";
import PagePage from "./PagePage.tsx";
import Content from "./Content.tsx";
import Login from "./Login.tsx";
import Admin from "./Admin.tsx";
import AddPerson from "./AddPerson.tsx";
import AddLetter from "./AddLetter.tsx";
import AddLocation from "./AddLocation.tsx";
import EditLetter from "./EditLetter.tsx";
import DeleteLetter from "./DeleteLetter.tsx";
import TextEdit from "./TextEdit.tsx";
import CombinePerson from "./CombinePerson.tsx";
import CombineLocation from "./CombineLocation.tsx";
import Selector from "./component/Selector.tsx";
import {LanguageTypeEnum} from "./enum/LanguageTypeEnum.tsx";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";

function App() {

    const [selectedLanguage, setSelectedLanguage] = useState<string>(strings.getLanguage());

    useEffect(() => {
        const cookies = new Cookies();
        const lan: string = cookies.get('language');
        if (lan != null) {
            console.log("cookie language: " + lan)
            const l = (stringToEnum(lan));
            if (l != undefined) {
                setSelectedLanguage(l);
            }
            strings.setLanguage(lan);
        } else {
            const l = (stringToEnum(strings.getLanguage()));
            if (l != undefined) {
                setSelectedLanguage(l);
            }
        }
    }, [selectedLanguage])

    function setLanguage(language: LanguageTypeEnum) {
        const cookies = new Cookies();
        cookies.set('language', language, {path: '/'});
        setSelectedLanguage(language);
    }

    function stringToEnum(str: string) {
        switch (str) {
            case 'nl':
                return LanguageTypeEnum.Nl;
            case 'en':
                return LanguageTypeEnum.En;
            case 'de':
                return LanguageTypeEnum.De;
            case 'fr':
                return LanguageTypeEnum.Fr;
            case 'es':
                return LanguageTypeEnum.Es;
        }
    }

    const l = strings.getLanguage()
    console.log('language ' + l)

    return (
        <div>
             <BrowserRouter>
                <div className='container-fluid h-auto vh-100 mt-3 '>
                    <div className="d-block d-sm-none"> {/* large screens */}
                        <h1>{strings.titel}</h1>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <p className='navbar-nav'>
                                        <Link to='/' className='linkStyle'>{strings.home}</Link>
                                    </p>
                                </td>
                                <td>
                                    <p className='navbar-nav textStyle'>
                                        <Link to='/get_letters/0' className='linkStyle'>{strings.letters}</Link>
                                    </p>
                                </td>
                                <td>
                                    <p className='navbar-nav textStyle'><Link to='/get_people/'
                                                                              className='linkStyle'>{strings.people}</Link>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='navbar-nav textStyle'>
                                        <Link to='/get_locations/' className='linkStyle'>{strings.locations}</Link>
                                    </p>
                                </td>
                                <td>
                                    <p className='navbar-nav textStyle'>
                                        <Link to='/references/' className='linkStyle'>{strings.references}</Link>
                                    </p>
                                </td>
                                <td>
                                    <p className='navbar-nav textStyle'>
                                        <Link to='/topics/' className='linkStyle'>{strings.topics}</Link>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className='navbar-nav textStyle'>
                                        <Link to='/get_page/1/1' className='linkStyle'>{strings.pages}</Link>
                                    </p>
                                </td>
                                <td>
                                    {/* Admin should only be visible after login. toggle enables Login.js
                                               to render App.js by setting its state  */}
                                    {isAdmin() === 'true' ?
                                        <p className='navbar-nav textStyle'>
                                            <Link to={'/admin/'} className='linkStyle'>{strings.admin}</Link>
                                        </p>
                                        : null}
                                </td>
                                <td>
                                    <p className='navbar-nav textStyle'>
                                        <Link to='/about/' className='linkStyle'>{strings.about}</Link>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-none d-sm-block">  {/* small screens */}
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td>
                                    <div className="position-absolute top-0 end-0 m-lg-3">
                                        <Selector
                                            enumType={LanguageTypeEnum}
                                            value={stringToEnum(selectedLanguage)}
                                            onChange={(selectedType) => setLanguage(selectedType)}>
                                        </Selector>
                                    </div>
                                    <h1 className='px-5'>{strings.titel}</h1>
                                    <nav className="navbar navbar-expand-lg navbar-light px-5">
                                        <p className='navbar-nav'>
                                            <Link to='/' className='linkStyle'>{strings.home}</Link>
                                        </p>
                                        <p className='navbar-nav textStyle'>
                                            <Link to='/get_letters/0' className='linkStyle'>{strings.letters}</Link>
                                        </p>
                                        <p className='navbar-nav textStyle'>
                                            <Link to='/get_people/' className='linkStyle'>{strings.people}</Link>
                                        </p>
                                        <p className='navbar-nav textStyle'>
                                            <Link to='/get_locations/'
                                                  className='linkStyle'>{strings.locations}</Link>
                                        </p>
                                        <p className='navbar-nav textStyle'>
                                            <Link to='/references/'
                                                  className='linkStyle'>{strings.references}</Link>
                                        </p>
                                        <p className='navbar-nav textStyle'>
                                            <Link to='/topics/' className='linkStyle'>{strings.topics}</Link>
                                        </p>
                                        <p className='navbar-nav textStyle'>
                                            <Link to='/get_page/1/1' className='linkStyle'>{strings.pages}</Link>
                                        </p>
                                        {/*Admin should only be visible after login. toggle enables Login.js to render App.js by setting its state*/}
                                        {
                                            isAdmin() === 'true' ?
                                                <p className='navbar-nav textStyle'>
                                                    <Link to={'/admin/'}
                                                          className='linkStyle'>{strings.admin}</Link>
                                                </p>
                                                : null
                                        }
                                        <p className='navbar-nav textStyle'>
                                            <Link to='/about/' className='linkStyle'>{strings.about}</Link>
                                        </p>
                                    </nav>
                                </td>
                                <td>
                                    <img src={twitli} className="logo" alt="logo"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <hr className="hr"/>

                    </div>
                    <div className='content-container'>
                        <Routes>
                            <Route path="/" element={<Landing/>}/>
                            <Route path="/admin/" element={<Admin/>}/>
                            <Route path="/login/" element={<Login/>}/>
                            {/*<Route path="/signup/" element={<Signup/>}/>*/}
                            <Route path="/get_letters/:page" element={<Letters/>}/>
                            <Route path="/add_person/" element={<AddPerson/>}/>
                            <Route path="/add_letter/" element={<AddLetter/>}/>
                            <Route path="/edit_letter/:number" element={<EditLetter/>}/>
                            <Route path="/delete_letter/:number" element={<DeleteLetter/>}/>
                            <Route path="/add_location/" element={<AddLocation/>}/>
                            <Route path="/combine_person/:id" element={<CombinePerson/>}/>
                            <Route path="/combine_location/:id" element={<CombineLocation/>}/>
                            <Route path="/get_location_details/:id" element={<LocationPage/>}/>
                            <Route path="/get_letters_for_location/:id" element={<Letters/>}/>
                            <Route path="/get_person_details/:id" element={<PersonPage/>}/>
                            <Route path="/get_letter_details/:number/:pagenumber" element={<LetterPage/>}/>
                            <Route path="/get_letters_for_person/:id/" element={<Letters/>}/>
                            <Route path="/get_text/:entity/:id" element={<TextPage/>}/>
                            <Route path="/get_page/:chapterNumber/:pageNumber" element={<PagePage/>}/>
                            <Route path="/edit_text/:type/:id" element={<TextEdit/>}/>
                            <Route path="/get_locations/" element={<Locations/>}/>
                            <Route path="/get_people/" element={<People/>}/>
                            <Route path="/references/" element={<ReferencesPage/>}/>
                            <Route path="/topics/" element={<Topics/>}/>
                            <Route path="/search_letters/:search_term" element={<Letters/>}/>
                            <Route path="/get_content/" element={<Content/>}/>
                            <Route path="/about/" element={<About/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
