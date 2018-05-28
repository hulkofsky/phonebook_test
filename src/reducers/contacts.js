const initialState = [
    {
        id: 1,
        phone: "+1(111)111-11-11",
        name: "James Hatfield",
        company: "Metallica",
        email: "hatfield@gmail.com",
        photo: "https://st.kp.yandex.net/images/actor_iphone/iphone360_483349.jpg"
    },
    {
        id: 2,
        phone: "+2(222)111-11-11",
        name: "Kirk Hammet",
        company: "Metallica",
        email: "hammet@gmail.com",
        photo: "https://www.fulltone.com/sites/default/files/photos/artists/kirk-hammett.jpg"
    },
    {
        id: 3,
        phone: "+3(333)111-11-11",
        name: "Corey Tailor",
        company: "Slipknot",
        email: "tailor@gmail.com",
        photo: "https://idolwiki.com/pics/CoreyTaylor/CoreyTaylor.jpg"
    },
    {
        id: 4,
        phone: "+4(444)111-11-11",
        name: "Janis Joplin",
        company: "Singer",
        email: "joplin@gmail.com",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Janis_Joplin_1970.JPG/267px-Janis_Joplin_1970.JPG"
    },
    {
        id: 5,
        phone: "+5(555)111-11-11",
        name: "Kurt Cobain",
        company: "Nirvana",
        email: "cobain@gmail.com",
        photo: "http://www.abc.net.au/radionational/image/3841692-3x4-460x613.jpg"
    },
    {
        id: 6,
        phone: "+6(666)111-11-11",
        name: "Jimmy Hendrix",
        company: "Guitarist",
        email: "hendrix@gmail.com",
        photo: "https://ewedit.files.wordpress.com/2018/03/jimihendrix_bothsidesofthesky_01_credit_chuckboyd_authentichendrix.jpg?w=1800"
    },

];

export default function contacts(state = initialState, action) {
    if(action.type === 'ADD_CONTACT') {
        return [
            ...state,
            action.payload
        ];
    }

    return state;
}