const partnersData = [
  {
    id: 1,
    src: "https://cleanly-700a6.firebaseapp.com/static/media/client1.def0ab85012bfbad060c.png",
    alt: "client logo 1",
  },
  {
    id: 2,
    src: "https://cleanly-700a6.firebaseapp.com/static/media/client2.285e61e534a0bdf2f0e9.png",
    alt: "client logo 2",
  },
  {
    id: 3,
    src: "https://cleanly-700a6.firebaseapp.com/static/media/client3.978545c05ed041bbd0c2.png",
    alt: "client logo 3",
  },
  {
    id: 4,
    src: "https://cleanly-700a6.firebaseapp.com/static/media/client4.954aae51fbeed8c38fd5.png",
    alt: "client logo 4",
  },
];

const Partners = () => {
  return (
    <section className="our-client">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <span>AS SEEN ON</span>
          </div>
          <div className="col-md-12">
            <ul>
              {partnersData.map((client) => (
                <li key={client.id}>
                  <a href="#">
                    <img
                      src={client.src}
                      className="img-fluid"
                      alt={client.alt}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
