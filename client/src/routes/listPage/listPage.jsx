// import React from 'react'
// import "./listPage.scss";
// import Filter from "../../components/filter/Filter";


// import {listData} from "../../lib/dummydata"
// import Map from '../../components/map/Map';
// import Card from '../../components/card/Card';

// export default function listPage() {

//   const data = listData;
 
//   return (
//     <div className="listPage">
//       <div className="listContainer">
//         <div className="wrapper">
//           <Filter />
//           <Card/>
//           {data.map(items => {
//             <Card key={items.id} item={item}/>
//           })}
//           {/* {data.map(item => {
//             <Card key={item.id} item={item} />
//           })} */}
//         </div>
//       </div>
//       <div className="mapContainer">
//       <Map items={data}/>
//       </div>
//     </div>
//   )
// }
import React, { Suspense } from 'react';
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import { listData } from "../../lib/dummydata";
import Map from '../../components/map/Map';
import Card from '../../components/card/Card';
import { Await, useLoaderData } from 'react-router-dom';

export default function ListPage() { // Capitalize the component name to follow convention
  const posts = useLoaderData();
// console.log(posts , " afsds ");
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {/* <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense> */}


          {posts.map((items) => (
            <Card key={items._id} item={items}/>
          ))}
        </div>
      </div>
      <div className="mapContainer">

      {/* <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense> */}

        {/* or */}
        <Map items={posts}/>
      </div>
    </div>
  );
}

