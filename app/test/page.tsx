import { Section } from "@components/Section"
import Image from 'next/image'
import { PageTMain } from "@components/layouts/PageTemplates"

type Props = {
  prop:string
}

export default async function BackupsPage ({}:Props) {


  return (
    <PageTMain 
      main={Main()}
    />
  )
}


//? Content



function Main(){

  return <>
    <Section>
        <Image 
          src={`/assets/circuit-board-2440249_1280.jpg`} 
          width="200"
          height="200"
          sizes="100vw"
          // style={{ width: '100%', height: 'auto' }}
          alt='site logo'/>
        
        <div>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos culpa autem, ab voluptates numquam sit nihil illum ratione quis architecto saepe ut suscipit odit aspernatur! Illum, provident incidunt! Amet, exercitationem.</p>
          <button> click me </button>
        </div>
      </Section>

      <Section>
        <div>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste cumque saepe ratione animi voluptas totam qui nemo. Error voluptatem eligendi quisquam officia, blanditiis eaque dolores vel animi ratione voluptas eos, dignissimos impedit similique deleniti maxime? Iure qui eum exercitationem doloremque? Iste officiis, et laboriosam omnis numquam fugiat dolore non totam voluptates necessitatibus vitae? Corporis maiores nesciunt, architecto incidunt velit, alias, inventore cupiditate necessitatibus et recusandae exercitationem fugiat accusamus culpa vel. Quod, inventore reprehenderit ullam corrupti cum aspernatur rerum odit, alias, illo quasi repellendus sit ut est aliquam voluptates! Commodi tempora, culpa necessitatibus voluptatum modi aliquid possimus vel quisquam, quis fugit porro. Dolore pariatur deleniti voluptatibus. In est fugiat dolorum nobis tempore impedit totam sed laudantium. Iusto alias ipsam fugit officiis?</p>
          <h2> That how we do </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe temporibus veritatis sapiente a excepturi assumenda harum rerum architecto veniam, distinctio dolorem ducimus numquam inventore officiis aut repellat ipsa molestias tempore culpa animi recusandae voluptate sit? Consectetur ratione quia, quis similique aliquam voluptatem. Dicta explicabo ipsum illo dolor, numquam laborum magnam itaque, vel quam et iste esse soluta cumque dignissimos.</p>
        </div>
        <Image 
          src={`/assets/circuit-board-2440249_1280.jpg`} 
          width="200"
          height="200"
          sizes="100vw"
          // style={{ width: '100%', height: 'auto' }}
          alt='site logo'/>
      </Section>

      <Section>

        <Image 
          src={`/assets/logo.png`} 
          width="200"
          height="200"
          sizes="100vw"
          // style={{ width: '100%', height: 'auto' }}
          alt='site logo'/>

        <Image 
          src={`/assets/circuit-board-2440249_1280.jpg`} 
          width="200"
          height="200"
          sizes="100vw"
          // style={{ width: '100%', height: 'auto' }}
          alt='site logo'/>
      </Section>

      <Section>

        <div className='bg-primary'>
          <h3> Wow... </h3>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
          <p>Lorem ipsum dolor sit amet </p>
        </div>

        <div className='bg-secondary'>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe temporibus veritatis sapiente a excepturi assumenda harum rerum architecto veniam, distinctio dolorem ducimus numquam inventore officiis aut repellat ipsa molestias tempore culpa animi recusandae voluptate sit? Consectetur ratione quia, quis similique aliquam voluptatem. Dicta explicabo ipsum illo dolor, numquam laborum magnam itaque, vel quam et iste esse soluta cumque dignissimos similique aliquam voluptatem. Dicta explicabo ipsum illo dolor, numquam laborum magnam itaque, vel quam et iste esse soluta cumque dignissimos similique aliquam voluptatem. Dicta explicabo ipsum illo dolor, numquam laborum magnam itaque, vel quam et iste esse soluta cumque dignissimos.</p>
        </div>
      </Section>
  </>
}