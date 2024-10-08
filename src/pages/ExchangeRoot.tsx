import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

import { PATH } from '@/constants';

const ExchangeRootPage = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    navigate(PATH.EXCHANGE.BUY);
  }, [navigate]);

  return <div></div>;
};

export default ExchangeRootPage;
