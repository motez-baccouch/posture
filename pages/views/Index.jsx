import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import ProductsFeatured from '../components/products-featured';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';

const Index = () => {
  return (
    <Layout>
      <PageIntro />

      <section className="featured">
        <div className="container">
          <article style={{backgroundImage: 'url(/images/featured-1.jpg)'}} className="featured-item featured-item-large">
            <div className="featured-item__content">
              <h3>DECOUVRE LE DOMAINE DE KINETHERAPIE</h3>
              <a href="#" className="btn btn--rounded">VOIR</a>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(/images/featured-2.jpg)'}} className="featured-item featured-item-small-first">
            <div className="featured-item__content">
              <h3>des kinés professional</h3>
              <a href="#" className="btn btn--rounded">PLUS DE DETAILS</a>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(/images/featured-3.jpg)'}} className="featured-item featured-item-small">
            <div className="featured-item__content">
              <h3>promotions ramadon</h3>
              <a href="#" className="btn btn--rounded">VOIR TOUT</a>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>pourquoi tu devrais nous choisir?</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Des kinés a domicile </h4>
                <p>vous pouvez choisir l'un des nombreux physiothérapeutes qui peuvent se déplacer jusqu'à vous</p>
              </div>
            </li>
            
            <li>
              <i className="icon-payment"></i>
              <div className="data-item__content">
                <h4>Paiement facile</h4>
                <p>Tous les paiements sont traités instantanément via un protocole de paiement sécurisé.</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Garantie de remboursement</h4>
                <p>Si un physiothérapeute n'a pas pu vous joindre ou si vous avez changé d'avis, vous pouvez toujours demander un remboursement complet.</p>
              </div>
            </li>
            
            <li>
              <i className="icon-materials"></i>
              <div className="data-item__content">
                <h4>meilleurs physiothérapeutes</h4>
                <p>nous avons choisi les meilleurs physiothérapeutes du pays juste pour vous</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <ProductsFeatured />
      <Subscribe />
      <Footer />
    </Layout>
  )
}


export default Index