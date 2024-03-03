
import { useState } from 'react';
import Layout from '../container/layout';
import MenuItem from '../container/MenuItem';
import Auth from '../auth';
import { useSelector } from 'react-redux';
import { Menus } from '../container/menuData';
import { DaysOfTheWeek } from '../helpers';

function Index(props) {
   
    const [Login, setLogin] = useState(false)
    const { userInfo } = useSelector((state) => state.auth)
    return (<>
        {!userInfo ? <Auth setLogin={setLogin} /> : < Layout >
            <div className='w-full flex flex-wrap  sm:mt-10 mt-2'>
                {Menus.map((item, i) => (
                    item.roles.includes(userInfo.role) && <MenuItem key={i} item={item} />
                ))}
            </div>
        </Layout >}
    </>
    );
}

export default Index;
