import React from 'react'
import { withNamespaces } from 'react-i18next';

function Loading(props) {
  const { t } = props;
  return (
    <div className="loading">
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">{t('global-loading')}</span>
        </div>
        <span className="ml-4">{props.title}</span>
    </div>
  )
}

export default withNamespaces()(Loading);
