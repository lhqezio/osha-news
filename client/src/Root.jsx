// import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FilterScroll from './FilterScroll';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Root(){
  const handle = useFullScreenHandle();
  const { t } = useTranslation();

  return (
    <>
      <div className="block md:hidden">
        <div className = {'absolute top-[40%] left-1/2 transform -translate-x-1/2 '
          + '-translate-y-1/2 text-2xl'
        }  >
          <button onClick={handle.enter}>
            {t('home.startScroll')}
          </button>
          <Link to="/scroll" className={'text-xs'}>
            {t('home.scrollInstruction')}
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