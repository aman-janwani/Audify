import Head from 'next/head';
import { ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import PurchaseCard from '../../src/components/purchase-card/purchasecard';
import { AppWeb3Context } from '../../src/provider/app-web3';
import { getAllAudiobooks, purchaseAudiobook } from '../../src/services/web3';
import SearchBox from '../../src/components/search-box';
import { IAudiobookData } from '../../src/models/audify';

import PageLayout from '../../src/layouts/page-layout';
import { toast } from 'react-toastify';
import Modal from '../../src/components/modal/modal';
import LoadingAudioCard from '../../src/components/audio-card/loading-state';
import Image from 'next/image';

const ExplorePage = () => {
    const [highlightedId, setHighlightedId] = useState<string>('');
    const [purchaseInProgress, setPurchaseInProgress] = useState(false);
    const [rerender, triggerRerender] = useState(false);
    const [allAudiobooks, setAllAudiobooks] = useState<IAudiobookData[]>([]);
    const [filteredAudiobooks, setFilteredAudiobooks] = useState<IAudiobookData[]>([]);
    const [loading, setLoading] = useState(false);

    const { dropBundleModule } = useContext(AppWeb3Context);

    useEffect(() => {
        (async () => {
            if (!dropBundleModule) return;

            setLoading(true);
            const allNFTs = await getAllAudiobooks(dropBundleModule);

            if (allNFTs) {
                setAllAudiobooks(allNFTs);
                setFilteredAudiobooks(allNFTs);
            }

            setLoading(false);
        })();
    }, [dropBundleModule, rerender]);

    const handlePurchase = async (name: string, tokenId: string, quantity: number = 1) => {
        if (!dropBundleModule) return;

        try {
            setPurchaseInProgress(true);

            await purchaseAudiobook(dropBundleModule, tokenId, quantity);
            toast.success('Successfully purchased', {
                position: 'bottom-right',
            });

            triggerRerender(!rerender);
            highlightCard(tokenId);
        } catch (error) {
            toast.error('Purchase failed!', {
                position: 'bottom-right',
            });
        } finally {
            setPurchaseInProgress(false);
        }
    };

    const handleSearch = (query: string) => {
        const filteredAudiobooks = allAudiobooks.filter((ab) => {
            const lowercaseQuery = query.toLowerCase();

            return (
                (ab.name as string).toLowerCase().includes(lowercaseQuery) ||
                (ab.desc as string).toLowerCase().includes(lowercaseQuery) ||
                (ab.writtenBy as string).toLowerCase().includes(lowercaseQuery)
            );
        });

        setFilteredAudiobooks(filteredAudiobooks);
    };

    const highlightCard = (id: string) => {
        setHighlightedId(id);
        setTimeout(() => setHighlightedId(''), 3500);
    };

    const getHighlightClassIfAny = (id: string) => {
        if (!highlightedId) return '';
        return highlightedId === id ? 'animate-highlight-once ring ring-indigo-500 ring-offset-1' : '';
    };

    const renderAllAudiobooks = () => {
        if (loading && filteredAudiobooks.length === 0) {
            return (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8">
                    <LoadingAudioCard />
                    <LoadingAudioCard />
                    <LoadingAudioCard />
                    <LoadingAudioCard />
                </div>
            );
        } else if (allAudiobooks.length !== 0 && filteredAudiobooks.length === 0) {
            return (
                <div className="grid w-full p-8 place-content-center">
                    <div className="w-[400px]">
                        <Image
                            width={'100%'}
                            height={'100%'}
                            layout="responsive"
                            className="object-center"
                            alt="hero"
                            src={'/images/no-data.svg'}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8">
                    {filteredAudiobooks.map((ab) => (
                        <div key={ab.id}>
                            <PurchaseCard
                                data={ab}
                                onPurchase={handlePurchase}
                                className={getHighlightClassIfAny(ab.id)}
                            />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <>
            <Head>
                <title>Audiobooks - Explore</title>
                <meta name="description" content="Audiobooks - Explore" />
            </Head>
            <div className="w-full mb-8 bg-gray-100 shadow-inner h-30">
                <div className="relative w-full -bottom-7">
                    <SearchBox onSearch={handleSearch} />
                </div>
            </div>
            <div className="p-8 m-auto max-w-7xl">
                <h2 className="mb-8 text-3xl font-semibold text-gray-800 ">All Audiobooks</h2>
                {renderAllAudiobooks()}
            </div>

            {purchaseInProgress && (
                <Modal
                    title="Purchasing Audiobook"
                    loading
                    description="You will be prompted to authorize 1 transactions."
                />
            )}
        </>
    );
};

export default ExplorePage;

ExplorePage.getLayout = function getLayout(page: ReactElement) {
    return <PageLayout>{page}</PageLayout>;
};