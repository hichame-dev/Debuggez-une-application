import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  // Vérifie que la section "Nos réalisations" (événements) est bien affichée sur la page
  it("a list of events is displayed", async () => {
    render(<Home />);        
    const eventsSections = await screen.findAllByText(/nos réalisations/i);
    expect(eventsSections.length).toBeGreaterThan(0);
  });

  // Vérifie que la section "Notre équipe" (people) est bien affichée sur la page
  it("a list of people is displayed", async () => {
    render(<Home />);
    const peopleSections = await screen.findAllByText(/notre équipe/i);
    expect(peopleSections.length).toBeGreaterThan(0);
  });
  
  // Vérifie que le footer de la page est bien présent avec le texte "Contactez-nous"
  it("a footer is displayed", async () => {
    render(<Home />);
    const contactFooter = await screen.findByText(/contactez-nous/i);
    expect(contactFooter).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
