import dynamic from 'next/dynamic'
import { search, mapImageResources } from '@/helpers/cloudinary'

const Home = dynamic(() => import('@/components/dom/Home'), { ssr: false })


async function getStillsData() {
  const results = await search({
    expression: 'folder=""',
  })

  const { resources, next_cursor: nextCursor, total_count: totalCount } = results

  const images = resources ? mapImageResources(resources) : []

  return { images }
}


async function getYoutubeData() {
  const YT_API_KEY = process.env.YT_API_KEY
  const YT_CHANNEL_ID = process.env.YT_CHANNEL_ID
  const MAX_RESULTS = `8`

  const REQUEST_URL_ALLVIDEOS = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YT_CHANNEL_ID}&maxResults=${MAX_RESULTS}&order=date&key=${YT_API_KEY}`
  const responseVideos = await fetch(REQUEST_URL_ALLVIDEOS)
  const dataAllVideos = await responseVideos.json()
  
  return { videos: dataAllVideos }
}



export default async function Page() {
  const stills = getStillsData()
  const yt = getYoutubeData();
  const [stillsData, ytData] = await Promise.all([stills, yt]);
  const carouselData = { stills: stillsData.images, motion: ytData.videos };

  return (
    <Home carouselData={carouselData} />
  )
}