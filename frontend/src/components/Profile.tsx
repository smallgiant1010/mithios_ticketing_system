import { useState, useEffect } from 'react';
import useAuthContext from '../hooks/useAuthContext';

export default function Profile() {
  const {username, id} = useAuthContext();
  const [profile, setProfile] = useState(null);
//  useEffect(() => {
//    
//  }, []);
  return (<div>
    PROFILE DATA
  </div>);
}
