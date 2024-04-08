// import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FilterScroll from './FilterScroll';
import { Link } from 'react-router-dom';

export default function Root(){
  const handle = useFullScreenHandle();

  return (
    <>
      <div className="block md:hidden">
        <div className = {'absolute top-[40%] left-1/2 transform -translate-x-1/2 '
          + '-translate-y-1/2 text-2xl'
        }  >
          <button onClick={handle.enter}>
        CLICK HERE TO START SCROLLING
          </button>
          <Link to="/scroll" className={'text-xs'}>
          ADD TO HOME SCREEN THEN CLICK HERE IF YOU&apos;RE ON SAFARI MOBILE (NOT RECOMMENDED)
          </Link>
        </div>
        <FullScreen handle={handle}>
          <div className={ handle.active ? 'block' : 'hidden'}>
            <FilterScroll />
          </div>
        </FullScreen>
      </div>
      <div className="hidden md:block">
        <FilterScroll />
      </div>
    </>
  );
}