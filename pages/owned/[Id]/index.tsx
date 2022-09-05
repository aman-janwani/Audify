import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaEthereum } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';
import { IoPlay, IoGift } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useWeb3 } from '@3rdweb/hooks';

// Components
import Button from '../../../src/components/button/button';
import Modal from '../../../src/components/modal/modal';

// Layouts
// import PageLayout from '../../../src/layouts/page-layout';

// Providers
// import { AppWeb3Context } from '../../../src/providers/app-web3';
// import { AudioPlayerContext } from '../../../src/providers/audio-player';

// Services
// import { getAudiobook, giftAudiobook, purchaseAudiobook } from '../../../src/services/web3';

// Models
import { IEntireAudiobookData } from '../../../src/models/audify';

const OwnedAudiobookPage = () => {
  const [localAudiobookData, setLocalAudiobookData] = useState<IEntireAudiobookData>();

  const [purchaseInProgress, setPurchaseInProgress] = useState(false);

  const [giftInProgress, setGiftInProgress] = useState(false);
  const [giftApiInProgress, setGiftApiInProgress] = useState(false);

  const [highlight, triggerHighlight] = useState(false);
  const [rerender, triggerRerender] = useState(false);
  const [recepientAddress, setRecepientAddress] = useState('');

  const {
    query: { Id },
  } = useRouter();

//   const { address } = useWeb3();

//   const { dropBundleModule } = useContext(AppWeb3Context);
//   const { setAudiobookData, setIsVisible } = useContext<any>(AudioPlayerContext);



  const highlightCard = () => {
    triggerHighlight(true);
    setTimeout(() => {
      triggerHighlight(false);
    }, 3500);
  };

  const handleGiftAudiobook = async () => {
    // if (!dropBundleModule || !recepientAddress) return;

    try {
      setGiftApiInProgress(true);

    //   const response = await giftAudiobook(dropBundleModule, recepientAddress, Id as string, 1);

      toast.success(
        <div>
          <p>Successfully Gifted</p>
          <span className="text-sm">
            You can check transaction details{' '}
            <a
              href={`https://rinkeby.etherscan.io/tx/${response.transactionHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500"
            >
              here
            </a>
          </span>
        </div>,
        {
          position: 'bottom-right',
        },
      );

      triggerRerender(!rerender);
      highlightCard();
    } catch (error) {
      toast.error('Gift failed!', {
        position: 'bottom-right',
      });
    } finally {
      setRecepientAddress('');
      setGiftApiInProgress(false);
      setGiftInProgress(false);
    }
  };

  const handlePurchase = async () => {
    // if (!dropBundleModule || !localAudiobookData) return;

    try {
      setPurchaseInProgress(true);

    //   await purchaseAudiobook(dropBundleModule, localAudiobookData.id, 1);
      toast.success('Successfully Purchased', {
        position: 'bottom-right',
      });

      triggerRerender(!rerender);
      highlightCard();
    } catch (error) {
      toast.error('Purchase failed!', {
        position: 'bottom-right',
      });
    } finally {
      setPurchaseInProgress(false);
    }
  };

//   const handlePlay = () => {
//     setAudiobookData(localAudiobookData);
//     setIsVisible(true);
//   };

  const getHighlightClassIfAny = () => {
    return highlight ? 'animate-highlight-once ring ring-indigo-500 ring-offset-1' : '';
  };

  const renderLoadingState = () => (
    <div className="grid max-h-screen p-20 place-content-center animate-pulse">
      <div
        className={`overflow-hidden bg-white rounded-lg shadow-xl w-[600px]  ${getHighlightClassIfAny()}`}
      >
        <div className="h-64 px-4 pt-2 bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="w-24 h-10 bg-gray-200 rounded-lg" />
            <div className="w-24 h-8 bg-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-64 h-64 mb-4 -mt-40 overflow-hidden bg-white rounded-lg"></div>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 py-4">
          <div className="w-56 h-8 bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded-lg w-96" />
        </div>
        <div className="flex flex-col items-start gap-4 px-8 py-4 pt-0 text-gray-600">
          <div className="flex items-center justify-between gap-8">
            <div className="w-32 h-6 bg-gray-200 rounded-lg" />
            <div className="w-40 h-6 bg-gray-200 rounded-lg" />
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="w-32 h-6 bg-gray-200 rounded-lg" />
            <div className="w-40 h-6 bg-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-2 mt-4 h-14">
          <div className="w-full h-full bg-gray-100" />
          <div className="w-full h-full bg-gray-100" />
          <div className="w-full h-full bg-gray-100" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Audiobooks - {localAudiobookData?.name}</title>
        <meta name="description" content={`Audiobooks - ${localAudiobookData?.name}`} />
      </Head>
      {localAudiobookData ? (
        <div className="grid max-h-screen p-20 place-content-center">
          <div
            className={`overflow-hidden bg-white rounded-lg shadow-2xl w-[600px]  ${getHighlightClassIfAny()}`}
          >
            <div className="h-64 px-4 pt-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500">
              <div className="flex items-center justify-between text-white">
                <h1 className="text-3xl font-semibold">#{localAudiobookData.id}</h1>

                <p className="flex items-center gap-[6px] px-2 py-2 text-sm font-semibold leading-none tracking-wide text-white bg-[#fff2] rounded-full">
                  {localAudiobookData.balance > 0 ? (
                    <>
                      <SiApplemusic className="text-base" />
                      You own {localAudiobookData.balance}
                    </>
                  ) : (
                    'Not purchased'
                  )}
                </p>
              </div>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-64 h-64 mb-4 -mt-40 overflow-hidden bg-white rounded-lg ring-2 ring-slate-100 ring-offset-2">
                <Image
                  src={localAudiobookData.image}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  alt="Laptop on Desk"
                  className="object-cover "
                />
              </div>
            </div>
            <div className="flex flex-col items-center px-8 py-4">
              <h1 className="mb-2 text-2xl font-bold text-gray-600 hover:cursor-pointer">
                {localAudiobookData.name}
              </h1>
              <p className="text-base text-gray-600 blockoverflow-hidden">
                {localAudiobookData.desc}
              </p>
            </div>
            <div className="flex flex-col items-start px-8 py-4 pt-0 text-gray-600">
              <div className="flex items-start justify-between">
                <p className="w-32 font-semibold text-gray-800">Written By</p>
                <p>{localAudiobookData.writtenBy}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Narrated By</p>
                <p>{localAudiobookData.narratedBy}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Ratings</p>
                <p>{localAudiobookData.ratings}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Category</p>
                <p>{localAudiobookData.category}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Language</p>
                <p>{localAudiobookData.lang}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Length</p>
                <p>{localAudiobookData.len}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Release Date</p>
                <p>{localAudiobookData.releaseDate}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-32 font-semibold text-gray-800">Publisher</p>
                <p>{localAudiobookData.publisher}</p>
              </div>
            </div>
            <div className="flex border-t h-14">
              <button
                className="flex items-center justify-center w-full h-full gap-2 group hover:border-transparent hover:font-bold hover:bg-indigo-500"
                onClick={handlePurchase}
              >
                <FaEthereum className="text-xl fill-gray-500 group-hover:fill-white" />
                <span className="text-sm group-hover:text-white">
                  {`${localAudiobookData.price}`}
                </span>
                <span className="text-sm group-hover:text-white">Purchase</span>
              </button>

              {localAudiobookData.balance > 0 && (
                <>
                  <button
                    className="flex items-center justify-center w-full h-full gap-2 border-x group hover:border-transparent hover:font-bold hover:bg-indigo-500"
                    onClick={handlePlay}
                    disabled={localAudiobookData.balance === 0}
                  >
                    <IoPlay className="text-xl fill-gray-500 group-hover:fill-white" />
                    <span className="text-sm group-hover:text-white">Play</span>
                  </button>
                  <button
                    className="flex items-center justify-center w-full h-full gap-2 group hover:border-transparent hover:font-bold hover:bg-indigo-500"
                    onClick={() => setGiftInProgress(true)}
                  >
                    <IoGift className="text-xl fill-gray-500 group-hover:fill-white" />
                    <span className="text-sm group-hover:text-white">Gift</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        renderLoadingState()
      )}

      {purchaseInProgress && (
        <Modal
          title="Purchasing Audiobook"
          loading
          description="You will be prompted to authorize 1 transactions."
        />
      )}

      {giftInProgress && (
        <Modal
          title="Gifting Audiobook"
          loading={giftApiInProgress}
          description={
            <div className="flex items-center w-full gap-4 mt-4">
              <input
                type="text"
                className="h-10 px-4 text-lg font-semibold text-gray-700 rounded shadow grow ring-2 ring-offset-2 ring-gray-300 focus:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Recepient address"
                disabled={giftApiInProgress}
                value={recepientAddress}
                onChange={(e) => setRecepientAddress(e.target.value)}
              />
              <Button variant="primary" disabled={giftApiInProgress} onClick={handleGiftAudiobook}>
                Gift
              </Button>
              <Button
                variant="primary"
                disabled={giftApiInProgress}
                onClick={() => {
                  setRecepientAddress('');
                  setGiftInProgress(false);
                }}
              >
                Cancel
              </Button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default OwnedAudiobookPage;

// OwnedAudiobookPage.getLayout = function getLayout(page: ReactElement) {
//   return <PageLayout>{page}</PageLayout>;
// };