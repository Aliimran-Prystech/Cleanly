import { Container, Row, Col, Card } from "react-bootstrap";

const Testomonial = () => {
  const testimonialData = [
    {
      id: 1,
      name: "Sandra",
      role: "Marketing Staff, New York",
      quote:
        "Maid Services NYC is a wonderful service. I utilized their services to clean a one bedroom apartment I was staying in NYC after throwing a get together. They were prompt, left the place spotless, and very professional.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jessica",
      role: "Senior Software Engineer",
      quote:
        "I had them out to help me clean my new place for an office dinner I was having. I was very happy with the results. Jennifer came to the location on time. It is such a treat to have the home professionally cleaned.",
      rating: 5,
    },
    {
      id: 3,
      name: "Samantha",
      role: "UX Designer, CreativeCo",
      quote:
        "They did such a good job. Whether you want to give a unique gift or have your own home cleaned, Maid for you provides a large range of top-notch services that I highly recommend to anyone.",
      rating: 4,
    },
  ];

  // Helper to render star ratings dynamically
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="container text-center testomonial">
      <section>
        <h2 className="mt-8">
          Don't take our <span>word</span>
        </h2>
        <p>
          Read what our past customers said about our cleaning and services.
        </p>
      </section>

      <section className="testimonial-section py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Clients Say</h2>
            <p className="text-muted">Real feedback from real professionals</p>
          </div>

          <Row className="g-4 pt-4">
            {testimonialData.map((client) => (
              <Col key={client.id} lg={4} md={6} sm={12}>
                <Card className="testimonial-card border-0 shadow-sm text-center h-100">
                  <Card.Body className="pt-0 px-4 pb-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="testimonial-stars mb-2 text-warning fs-5">
                        {renderStars(client.rating)}
                      </div>
                      <Card.Text className="testimonial-quote text-secondary italic mb-4">
                        "{client.quote}"
                      </Card.Text>
                    </div>
                    <div>
                      <Card.Title className="fw-bold mb-0 fs-5">
                        {client.name}
                      </Card.Title>
                      <small className="text-muted fs-6">{client.role}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Testomonial;
