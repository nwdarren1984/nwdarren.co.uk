const {createClient} = require('@sanity/client');

const client = createClient({
  projectId: 's4g5uj9o',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

client.fetch('*[_type == "artist"]{_id, name, description, photo}').then((result) => {
  console.log(JSON.stringify(result, null, 2));
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
