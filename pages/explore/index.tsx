import Head from "next/head";
import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PurchaseCard from "../../src/components/purchase-card/purchasecard";
// import { AppWeb3Context } from "../../src/provider/app-web3";
// import { getAllAudiobooks, purchaseAudiobook } from "../../src/services/web3";
import SearchBox from "../../src/components/search-box";
import { IAudiobookData } from "../../src/models/audify";

// import PageLayout from "../../src/layouts/page-layout";
import { toast } from "react-toastify";
import Modal from "../../src/components/modal/modal";
import LoadingAudioCard from "../../src/components/audio-card/loading-state";
import Image from "next/image";
import useDarkMode from "../../src/hooks/useDarkMode";
import { useEditionDrop, useNFTCollection, useNFTs } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const ExplorePage = () => {
  const [highlightedId, setHighlightedId] = useState<string>("");
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);
  const [rerender, triggerRerender] = useState(false);
  const [allAudiobooks, setAllAudiobooks] = useState([]);
  const [filteredAudiobooks, setFilteredAudiobooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // const { dropBundleModule } = useContext(AppWeb3Context);
  const [colorTheme, setTheme] = useDarkMode();

  const editionDrop = useEditionDrop(
    "0x3B4451282445e803db437ede3fA1EA9f4Bfd2A79"
  );

  const aman = useNFTCollection("0x3B4451282445e803db437ede3fA1EA9f4Bfd2A79");
  const { data: nfts } = useNFTs(aman);

  useEffect(() => {
    if (nfts) {
      setAllAudiobooks(nfts);
      setFilteredAudiobooks(nfts);
    }
  }, [nfts]);

  console.log("aman", allAudiobooks);
  

  // useEffect(() => {
  //   (async () => {
  //     if (!dropBundleModule) return;

  //     setLoading(true);
  //     const allNFTs = await getAllAudiobooks(dropBundleModule);

  //     if (allNFTs) {
  //       setAllAudiobooks(allNFTs);
  //       setFilteredAudiobooks(allNFTs);
  //     }

  //     setLoading(false);
  //   })();
  // }, [dropBundleModule, rerender]);

  // const handlePurchase = async (
  //   name: string,
  //   tokenId: string,
  //   quantity: number = 1
  // ) => {
  //   if (!dropBundleModule) return;

  //   try {
  //     setPurchaseInProgress(true);

  //     await purchaseAudiobook(dropBundleModule, tokenId, quantity);
  //     toast.success("Successfully purchased", {
  //       position: "bottom-right",
  //     });

  //     triggerRerender(!rerender);
  //     highlightCard(tokenId);
  //   } catch (error) {
  //     toast.error("Purchase failed!", {
  //       position: "bottom-right",
  //     });
  //   } finally {
  //     setPurchaseInProgress(false);
  //   }
  // };

  // const handleSearch = (query: string) => {
  //   const filteredAudiobooks = allAudiobooks.filter((audiobook) => audiobook.name.toLowerCase().includes(query.toLowerCase()));

  //   setFilteredAudiobooks(filteredAudiobooks);
  // };

  // const highlightCard = (id: string) => {
  //   setHighlightedId(id);
  //   setTimeout(() => setHighlightedId(""), 3500);
  // };

  // const getHighlightClassIfAny = (id: string) => {
  //   if (!highlightedId) return "";
  //   return highlightedId === id
  //     ? "animate-highlight-once ring ring-indigo-500 ring-offset-1"
  //     : "";
  // };

  // const renderAllAudiobooks = () => {
  //   if (loading && filteredAudiobooks.length === 0) {
  //     return (
  //       <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8">
  //         <LoadingAudioCard />
  //         <LoadingAudioCard />
  //         <LoadingAudioCard />
  //         <LoadingAudioCard />
  //       </div>
  //     );
  //   } else if (allAudiobooks.length !== 0 && filteredAudiobooks.length === 0) {
  //     return (
  //       <div className="grid w-full p-8 place-content-center">
  //         <div className="w-[400px]">
  //           <Image
  //             width={"100%"}
  //             height={"100%"}
  //             layout="responsive"
  //             className="object-center"
  //             alt="hero"
  //             src={"/images/no-data.svg"}
  //           />
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-8">
  //         {filteredAudiobooks.map((ab) => (
  //           <div key={ab.id}>
  //             <PurchaseCard
  //               data={ab}
  //               onPurchase={handlePurchase}
  //               className={getHighlightClassIfAny(ab.id)}
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   }
  // };

  return (
    <div className="dark:bg-zinc-900 bg-white">
      <Head>
        <title>Audiobooks | Explore</title>
        <meta name="description" content="Audiobooks - Explore" />
      </Head>
      <div className="w-full mb-8 flex bg-gray-100 dark:bg-zinc-800 shadow-inner h-30">
        <div className="relative w-full -bottom-7">
          {/* <SearchBox onSearch={handleSearch} /> */}
        </div>
        {colorTheme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setTheme("light")}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 p-2 rounded-full cursor-pointer text-white hover:bg-zinc-200/10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setTheme("dark")}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-zinc-800/10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </div>
      <div className="p-8 m-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-semibold text-gray-800 dark:text-gray-200 ">
          All Audiobooks
        </h2>
        {filteredAudiobooks.length !== 0 && (
          <div className="flex space-x-5">
            {filteredAudiobooks?.map((nft, index) => (
              <div
                key={nft.metadata.name}
                className="dark:bg-zinc-800 dark:text-white h-fit max-w-xs flex flex-col space-y-3 rounded-lg"
              >
                <div className="w-[20rem] h-[23rem] rounded-t-lg relative">
                  <Image
                    src={nft.metadata.image}
                    layout="fill"
                    className=" rounded-t-lg"
                  />
                </div>
                <p className="dark:bg-zinc-700 bg-slate-100 flex items-center justify-center rounded-full mx-3 font-medium w-10">#{index}</p>
                <div className="px-5 py-5">
                  <p className="font-bold text-lg">{nft.metadata.name}</p>
                  <p className="truncate">{nft.metadata.description}</p>
                </div>
                {/* <p>~{nft.metadata.name}</p> */}
                  <button onClick={() => {
                    router.push(`/owned/${index}`)
                  }} className="bg-blue-400 w-full p-3 rounded-b-lg text-white font-medium hover:bg-blue-500 duration-300">Purchase</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {purchaseInProgress && (
        <Modal
          title="Purchasing Audiobook"
          loading
          description="You will be prompted to authorize 1 transactions."
        />
      )}
    </div>
  );
};

export default ExplorePage;

// ExplorePage.getLayout = function getLayout(page: ReactElement) {
//   return <PageLayout>{page}</PageLayout>;
// };
