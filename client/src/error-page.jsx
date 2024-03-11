import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const err = useRouteError();
  console.error(err);
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('error.error')}</h1>
      <p>{t('error.unexpected')}</p>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
    </div>
  );
}