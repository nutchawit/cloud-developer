import express, { response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get( "/filteredimage", async ( req, res ) => {
    console.info(`-----------------------------`)

    let {image_url} = req.query;
    if(image_url==null || image_url==''){
      res.status(400).send(`Parameter image_url not found!`);

      return;
    }

    console.debug(`Processing image from URL=${image_url}`);

    try {
      var local_image_path = await filterImageFromURL(image_url);

      console.debug(`Found local image path=${local_image_path}`);
    
      res.status(200).sendFile(local_image_path, function(err){

        if(err){
          console.error(`Found error while write out the response:${err}`);
        }else{
          console.debug(`Deleting temporary image path=${local_image_path}`);
          var del_image_local_path_arr = [local_image_path];
          deleteLocalFiles(del_image_local_path_arr);
        }
      });
    } catch (error) {
      console.error(`Found error while processing image Error=${error}`);
      res.status(500).send(`Processing image error:${error}`);
    }


  } );

  process.on('unhandledRejection', function(err) {
    console.log(err);

    response.status(500);
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();