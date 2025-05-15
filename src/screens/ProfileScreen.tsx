//@ts-nocheck
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import Layout from '../components/Layout';
import BankBalance from '../components/profile/BankBalanceComponent';
import {useAuth} from '../providers/auth-provider';
import userService from '../services/UserService';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Icons} from '../components/icons';
import ModalComponent from '../components/Modal';

const demoData = [
  {
    title: 'Heading 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 4',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
  {
    title: 'Heading 5',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aspernatur exercitationem iste, a dignissimos, voluptatum expedita perspiciatis deleniti veritatis, molestias unde mollitia explicabo! Exercitationem sed officia ratione deleniti illo?',
  },
];

const DataProtectionModal = ({visible, onClose, children}) => {
  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      headerComponent={
        <TouchableOpacity onPress={onClose}>
          <Icons name="close-light" size={25} color={'#454d66'} />
        </TouchableOpacity>
      }>
      {children}
    </ModalComponent>
  );
};

const ImprintModal = ({visible, onClose, children}) => {
  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      headerComponent={
        <TouchableOpacity onPress={onClose}>
          <Icons name="close-light" size={25} color={'#454d66'} />
        </TouchableOpacity>
      }>
      {children}
    </ModalComponent>
  );
};

const DataProtectionModalContent = ({data}) => (
  // <ScrollView
  //   contentContainerStyle={styles.dataProtectionModalContentContainer}>
  //   {data?.map((item, index) => (
  //     <View key={index} style={styles.dataProtectionModalContentBox}>
  //       <Text style={styles.dataProtectionModalContentTitle}>
  //         {item?.title}
  //       </Text>
  //       <Text style={styles.dataProtectionModalContentPara}>
  //         {item?.content}
  //       </Text>
  //     </View>
  //   ))}
  // </ScrollView>

  <ScrollView style={styles.modalWrapper}>
    <Text style={styles.h1}>Impressum</Text>
    <Text style={styles.h2}>Angaben gemäß § 5 TMG:</Text>
    <Text style={styles.paragraph}>
      lifebalanceplus GmbH{'\n'}
      Handelsregister HRB 108349{'\n'}
      Amtsgericht Düsseldorf{'\n'}
      USt-IdNr.: DE283846497
    </Text>
    <Text style={styles.paragraph}>
      Bockumerstraße 57{'\n'}
      40489 Düsseldorf
    </Text>
    <Text style={styles.paragraph}>
      Vertreten durch:{'\n'}
      Uwe Meyer{'\n'}{'\n'}
      Kontakt:{'\n'}
      info@lifebalanceplus.de{'\n'}{'\n'}
      Zum Kontaktformular ...
    </Text>

    <View style={styles.separator} />

    <Text style={styles.h1}>Haftungsausschluss</Text>
    <Text style={styles.h2}>Haftung für Inhalte</Text>
    <Text style={styles.paragraph}>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
      Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
      keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG
      für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
      verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
      nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
      überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
      Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
      Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
      unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
      der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
      von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
      entfernen.
    </Text>

    <Text style={styles.h2}>Haftung für Links</Text>
    <Text style={styles.paragraph}>
      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
      Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
      Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
      Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
      verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
      auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
      Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
      Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
      einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
      Rechtsverletzungen werden wir derartige Links umgehend entfernen.
    </Text>

    <Text style={styles.h2}>Urheberrecht</Text>
    <Text style={styles.paragraph}>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
      Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
      Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
      des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
      Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
      privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
      dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
      Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
      gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
      aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
      Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend
      entfernen.
    </Text>

    <Text style={styles.h2}>Datenschutz</Text>
    <Text style={styles.paragraph}>
      Die Nutzung unserer Webseite ist in der Regel ohne Angabe
      personenbezogener Daten möglich. Soweit auf unseren Seiten
      personenbezogene Daten (beispielsweise Name, Anschrift oder
      eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
      freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
      nicht an Dritte weitergegeben. Wir weisen darauf hin, dass die
      Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
      Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem
      Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen der
      Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
      Übersendung von nicht ausdrücklich angeforderter Werbung und
      Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die
      Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im
      Falle der unverlangten Zusendung von Werbeinformationen, etwa durch
      Spam-Mails, vor.
    </Text>
    <Text style={styles.paragraph}>
      Mehr zum Datenschutz bei lifebalance-plus erfahren Sie in unserer{' '}
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL('https://www.lifebalanceplus.de/datenschutz/')
        }>
        Datenschutzerklärung
      </Text>
      .
    </Text>
  </ScrollView>
);

const ImprintModalContent = ({data}) => (
  <ScrollView style={styles.modalWrapper}>
    <Text style={styles.h2}>lifebalance:plus GmbH Datenschutzrichtlinie</Text>
    <Text style={styles.paragraph}>
      Ihre Privatsphäre ist uns wichtig. lifebalance:plus GmbHs espektiert Ihre
      Privatsphäre und hält sich an alle geltenden Gesetze und Vorschriften in
      Bezug auf persönliche Daten, die wir über Sie sammeln, auch über unsere
      App lifebalance:plus und die damit verbundenen Dienste.
    </Text>
    <Text style={styles.paragraph}>
      Personenbezogene Daten sind alle Informationen über Sie, die dazu
      verwendet werden können, Sie zu identifizieren. Dazu gehören Informationen
      über Sie als Person (z. B. Name, Adresse und Geburtsdatum), Ihre Geräte,
      Zahlungsdetails und sogar Informationen darüber, wie Sie eine App oder
      einen Online-Dienst nutzen.
    </Text>
    <Text style={styles.paragraph}>
      Beachten Sie bitte, dass Links zu Seiten und Dienstleistungen bedeuten,
      dass diese Seiten ihre eigenen Datenschutzrichtlinien haben. Nachdem Sie
      auf eine solche Seite gelangen, sollten Sie sich mit den dortigen
      Datenschutzrichtlinien vertraut machen, um zu verstehen, wie Ihre
      persönlichen Daten verwendet werden. Diese Datenschutzrichtlinie gilt
      ausdrücklich nicht für jedwede Aktivitäten, nachdem Sie unsere Webseite
      verlassen.
    </Text>
    <Text style={styles.paragraph}>
      Diese Richtlinien sind ab dem 11 November 2024 gültig.
    </Text>
    <Text style={styles.paragraph}>
      Letzte Aktualisierung: 11 November 2024
    </Text>
    <Text style={styles.h3}>Daten, die wir erheben</Text>
    <Text style={styles.paragraph}>
      Die von uns erhobenen Daten fallen in eine von zwei Kategorien:
      "freiwillig zur Verfügung gestellte" und "automatisch erfasste"
      Informationen.
    </Text>
    <Text style={styles.paragraph}>
      "Freiwillig bereitgestellte" Informationen beziehen sich auf alle
      Informationen, die Sie uns wissentlich und aktiv zur Verfügung stellen,
      wenn Sie unsere App und die damit verbundenen Dienste nutzen.
    </Text>
    <Text style={styles.paragraph}>
      "Automatisch gesammelte" Informationen beziehen sich auf alle
      Informationen, die automatisch von Ihrem Gerät im Zuge des Zugriffs auf
      unsere App und die damit verbundenen Dienste gesendet werden.
    </Text>
    <Text style={styles.h3}>Log-Dateien</Text>
    <Text style={styles.paragraph}>
      Wenn Sie über unsere App auf unsere Server zugreifen, protokollieren wir
      möglicherweise automatisch die von Ihrem Gerät bereitgestellten
      Standarddaten. Dazu gehören die Internetprotokoll-Adresse (IP) Ihres
      Geräts, der Typ und die Version Ihres Geräts, Ihre Aktivitäten innerhalb
      der App, die Uhrzeit und das Datum sowie weitere Details über Ihre
      Nutzung.
    </Text>
    <Text style={styles.paragraph}>
      Weiterhin gilt: Wenn Sie bei der Nutzung der App auf bestimmte Fehler
      stoßen, erfassen wir außerdem automatisch Daten über den Fehler und die
      Umstände seines Auftretens. Diese Daten können technische Details über Ihr
      Gerät enthalten, was Sie versuchten zu tun, als der Fehler auftrat, und
      andere technische Informationen in Bezug auf das Problem. Es kann sein,
      dass Sie von solchen Fehlern, selbst wenn sie auftreten, keine Nachricht
      erhalten, dass sie aufgetreten sind oder welcher Art der Fehler ist.
    </Text>
    <Text style={styles.paragraph}>
      Bitte beachten Sie, dass diese Informationen zwar für sich genommen nicht
      persönlich identifizierbar sind, dass es aber möglich sein kann, sie mit
      anderen Daten zu kombinieren, um einzelne Personen zu identifizieren.
    </Text>
    <Text style={styles.h3}>Gerätedaten</Text>
    <Text style={styles.paragraph}>
      Unsere App kann über die eingebauten Tools Ihres Geräts auf Daten
      zugreifen und diese sammeln, z. B:
    </Text>
    <View style={styles.listContainer}>
      <Text style={styles.listItem}>• Kamera</Text>
    </View>
    <Text style={styles.paragraph}>
      Wenn Sie die App installieren oder die Tools Ihres Geräts innerhalb der
      App verwenden, bitten wir Sie um die Erlaubnis, auf diese Informationen
      zuzugreifen. Die spezifischen Daten, die wir sammeln, können von den
      individuellen Einstellungen Ihres Geräts und den Berechtigungen abhängen,
      die Sie bei der Installation und Nutzung der App erteilen.
    </Text>
    <Text style={styles.h3}>Persönliche Daten</Text>
    <Text style={styles.paragraph}>
      Wir können nach persönlichen Daten fragen — wenn Sie uns kontaktieren —
      die eine oder mehrere der folgenden Informationen enthalten können:
    </Text>
    <View style={styles.listContainer}>
      <Text style={styles.listItem}>• Rechnungen</Text>
      <Text style={styles.listItem}>• Belege</Text>
    </View>
    <Text style={styles.h3}>
      Berechtigte Gründe für die Verarbeitung personenbezogener Daten
    </Text>
    <Text style={styles.paragraph}>
      Wir sammeln und verwenden Ihre persönlichen Daten nur, wenn wir einen
      berechtigten Grund dazu haben. In diesem Fall erheben wir nur
      personenbezogene Daten, die vernünftigerweise notwendig sind, um Ihnen
      unsere Leistungen zu erbringen.
    </Text>
    <Text style={styles.h3}>Erhebung und Verwendung von Daten</Text>
    <Text style={styles.paragraph}>
      Wir können personenbezogene Daten von Ihnen erfassen, wenn Sie eine der
      folgenden Aktionen in unserer App durchführen:
    </Text>
    <View style={styles.listContainer}>
      <Text style={styles.listItem}>
        • Mit Mobilgerät oder Web-Browser auf unseren Content zugreifen
      </Text>
      <Text style={styles.listItem}>
        • Kontaktieren Sie uns per E-Mail, über Social Media oder ähnliche
        Technologien
      </Text>
      <Text style={styles.listItem}>
        • Wenn Sie uns auf Social Media erwähnen
      </Text>
    </View>
    <Text style={styles.paragraph}>
      Wir können freiwillig bereitgestellte und automatisch erfasste
      personenbezogene Informationen mit allgemeinen Informationen oder
      Forschungsdaten kombinieren, die wir von anderen vertrauenswürdigen
      Quellen erhalten. Wenn Sie uns beispielsweise den Zugriff auf Ihre
      Social-Media-Profile gestatten, können wir Informationen, die von diesen
      Profilen stammen, mit Informationen, die Sie uns direkt gegeben haben,
      kombinieren, um Ihnen eine verbesserte Nutzungserfahrung unserer App und
      Dienste zu bieten.
    </Text>
    <Text style={styles.h4}>Sicherheit Ihrer persönlichen Daten</Text>
    <Text style={styles.paragraph}>
      Wenn wir persönliche Daten erfassen und verarbeiten und solange wir diese
      Daten speichern, schützen wir sie mit wirtschaftlich vertretbaren Mitteln,
      um Verlust und Diebstahl sowie unbefugten Zugriff, Offenlegung, Kopieren,
      Verwendung oder Änderung zu verhindern.
    </Text>
    <Text style={styles.paragraph}>
      Obwohl wir unser Bestes tun, um die persönlichen Daten, die Sie uns zur
      Verfügung stellen, zu schützen, weisen wir darauf hin, dass keine Methode
      der elektronischen Übertragung oder Speicherung zu 100 Prozent sicher ist,
      und niemand kann totale Datensicherheit garantieren.
    </Text>
    <Text style={styles.paragraph}>
      Sie sind verantwortlich für die Wahl des Passworts und dessen allgemeine
      Sicherheitsstärke, um die Sicherheit Ihrer eigenen Daten im Rahmen unserer
      Dienste zu gewährleisten. Zum Beispiel sollten Sie sicherstellen, dass Sie
      Ihre persönlichen Informationen nicht öffentlich über unsere Plattform
      zugänglich machen.
    </Text>
    <Text style={styles.h4}>
      Wie lange wir Ihre persönlichen Daten behalten
    </Text>
    <Text style={styles.paragraph}>
      Wir bewahren Ihre persönlichen Daten nur so lange auf, wie wir sie
      benötigen. Dieser Zeitraum kann davon abhängen, wofür wir Ihre Daten in
      Übereinstimmung mit dieser Datenschutzrichtlinie verwenden. Zum Beispiel,
      wenn Sie uns personenbezogene Daten wie beispielsweise eine E-Mail-Adresse
      zur Verfügung gestellt haben, wenn Sie uns wegen einer bestimmten Anfrage
      kontaktieren, dürfen wir diese Daten für die Dauer des Verfahrens
      aufbewahren, solange Ihre Anfrage offen ist und für unsere eigenen
      Unterlagen verbleibt, damit wir ähnliche Anfragen in Zukunft effektiv
      bearbeiten können. Wenn Ihre persönlichen Daten für diesen Zweck nicht
      mehr benötigt werden, löschen oder anonymisieren wir sie, indem wir alle
      Angaben entfernen, die Sie identifizieren.
    </Text>
    <Text style={styles.paragraph}>
      Falls erforderlich, können wir Ihre personenbezogenen Daten jedoch
      aufbewahren, um gesetzlichen, buchhalterischen oder
      Berichtsverpflichtungen nachzukommen oder für Archivierungszwecke im
      öffentlichen Interesse, wissenschaftlichen oder historischen Forschungs-
      oder statistische Zwecke.
    </Text>
    <Text style={styles.h3}>Privatsphäre von Kindern</Text>
    <Text style={styles.paragraph}>
      Unsere Produkte und Dienstleistungen richten sich nicht direkt an Kinder
      unter 13 Jahren, und wissentlich erfassen wir keine persönlichen Daten von
      Kindern unter 13 Jahren.
    </Text>
    <Text style={styles.h3}>
      Ihre Rechte und die Kontrolle Ihrer persönlichen Daten
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Ihre Wahl:</Text> Indem Sie uns personenbezogene
      Daten zur Verfügung stellen, verstehen Sie, dass wir Ihre
      personenbezogenen Daten in Übereinstimmung mit dieser
      Datenschutzrichtlinie sammeln, speichern, verwenden und offenlegen. Sie
      müssen uns keine personenbezogenen Daten zur Verfügung stellen, jedoch
      kann es Ihre Nutzung unserer App oder der über sie angebotenen Produkte
      und/oder Dienstleistungen beeinträchtigen, wenn Sie dies nicht tun.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Daten von Drittanbietern:</Text> Wenn wir
      persönliche Informationen über Sie von einem Dritten erhalten, werden wir
      diese wie in dieser Datenschutzerklärung beschrieben schützen. Wenn Sie
      ein Drittanbieter sind, der persönliche Daten einer anderen Person zur
      Verfügung stellt, sichern Sie zu, dass Sie die Zustimmung dieser Person
      haben, diese an uns weiterzugeben.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Marketing-Erlaubnis:</Text> Wenn Sie zuvor
      zugestimmt haben, dass wir Ihre persönlichen Daten für Direktmarketing
      verwenden, können Sie Ihre Meinung jederzeit ändern, indem Sie sich mit
      uns in Verbindung setzen und die nachstehenden Angaben machen
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Zugriff:</Text> Sie können Einzelheiten zu den
      persönlichen Daten anfordern, die wir über Sie gespeichert haben.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Korrektur:</Text> Wenn Sie der Meinung sind,
      dass Informationen, die wir über Sie gespeichert haben, ungenau, veraltet,
      unvollständig, irrelevant oder irreführend sind, wenden Sie sich bitte an
      uns unter Verwendung der in dieser Datenschutzrichtlinie angegebenen
      Kontaktmöglichkeiten. Wir werden angemessene Schritte unternehmen, um alle
      Informationen zu korrigieren, die sich als ungenau, unvollständig,
      irreführend oder veraltet erweisen.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Nicht-Diskriminierung:</Text> Wir werden Sie
      nicht benachteiligen, wenn Sie eines Ihrer Rechte in Bezug auf Ihre
      persönlichen Daten wahrnehmen. Sofern Ihre persönlichen Daten nicht
      benötigt werden, um Ihnen eine bestimmte Dienstleistung oder ein
      bestimmtes Angebot zu unterbreiten (beispielsweise Benutzerunterstützung),
      werden wir Ihnen keine Waren oder Dienstleistungen vorenthalten und/oder
      Ihnen andere Preise oder Tarife für Waren oder Dienstleistungen in
      Rechnung stellen, auch nicht durch die Gewährung von Rabatten oder anderen
      Vorteilen oder die Verhängung von Strafen, oder Ihnen ein anderes Niveau
      oder eine andere Qualität von Waren oder Dienstleistungen bieten.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>
        Benachrichtigung über Datenschutzverletzungen:
      </Text>{' '}
      Wir werden die auf uns anwendbaren Gesetze in Bezug auf jede
      Datenschutzverletzung einhalten.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Beschwerde:</Text> Wenn Sie der Meinung sind,
      dass wir gegen ein entsprechendes Datenschutzgesetz verstoßen haben, und
      eine Beschwerde einreichen möchten, wenden Sie sich bitte unter Verwendung
      der nachstehenden Angaben an uns und teilen Sie uns alle Einzelheiten zu
      dem mutmaßlichen Verstoß mit. Wir werden Ihre Beschwerde umgehend
      untersuchen und Ihnen schriftlich antworten, wobei wir Ihnen das Ergebnis
      unserer Untersuchung und die Schritte mitteilen werden, die wir
      unternehmen werden, um Ihre Beschwerde zu bearbeiten. Sie haben auch das
      Recht, sich mit Ihrer Beschwerde an Ihren Datenschutzbeauftragten oder
      eine Regulierungsbehörde zu wenden.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Abmelden:</Text> Um sich von unserer
      E-Mail-Datenbank abzumelden oder Mitteilungen (einschließlich
      Marketingmitteilungen) abzubestellen, wenden Sie sich bitte an uns, indem
      Sie die in dieser Datenschutzrichtlinie angegebenen Kontaktmöglichkeiten
      verwenden, oder nutzen Sie die in der Mitteilung angegebenen
      Abmeldemöglichkeiten. Gegebenenfalls müssen wir Sie um bestimmte
      Informationen bitten, damit wir Ihre Identität bestätigen können.
    </Text>
    <Text style={styles.h3}>Verwendung von Cookies</Text>
    <Text style={styles.paragraph}>
      Unsere Datenschutzrichtlinie behandelt die Verwendung von Cookies zwischen
      Ihrem Gerät und unseren Servern. Ein Cookie ist eine kleine Datei, die
      eine App auf Ihrem Gerät speichern kann. Sie enthält in der Regel eine
      eindeutige Kennung, die es den App-Servern ermöglicht, Ihr Gerät zu
      erkennen, wenn Sie die App verwenden, Informationen über Ihren Account,
      Ihre Sitzung und/oder Ihr Gerät, zusätzliche Daten, die dem Zweck des
      Cookies dienen, sowie Informationen über die Selbstwartung des Cookies.
    </Text>
    <Text style={styles.paragraph}>
      Wir verwenden Cookies, um Ihrem Gerät den Zugang zu den Hauptfunktionen
      unserer App zu ermöglichen, die Nutzung der App und die Leistung auf Ihrem
      Gerät zu verfolgen, die Nutzung unserer App auf Ihre Präferenzen
      zuzuschneiden und Werbung auf Ihrem Gerät anzuzeigen. Jegliche
      Kommunikation von Cookie-Daten zwischen Ihrem Gerät und unseren Servern
      erfolgt in einer sicheren Umgebung.
    </Text>
    <Text style={styles.paragraph}>
      Weitere Informationen finden Sie in unserer Cookie-Richtlinie.
    </Text>
    <Text style={styles.h3}>Betriebsübertragungen</Text>
    <Text style={styles.paragraph}>
      Im Falle einer Übernahme von uns oder unseren Vermögenswerten oder in dem
      unwahrscheinlichen Fall, dass wir unser Geschäft aufgeben oder in Konkurs
      gehen, würden wir Daten, einschließlich Ihrer persönlichen Informationen,
      zu den Vermögenswerten zählen, die an Parteien übertragen werden, die uns
      übernehmen. Sie erkennen an, dass es zu solchen Übertragungen kommen kann
      und dass die Parteien, die uns übernehmen, Ihre personenbezogenen Daten im
      Rahmen der geltenden Gesetze weiterhin gemäß dieser Richtlinie verwenden
      können, die sie übernehmen müssen, da sie die Grundlage für alle
      Eigentums- oder Nutzungsrechte ist, die wir an diesen Daten haben.
    </Text>
    <Text style={styles.h3}>Grenzen unserer Richtlinie</Text>
    <Text style={styles.paragraph}>
      Unsere App kann Links zu externen Websites enthalten, die nicht von uns
      betrieben werden. Bitte beachten Sie, dass wir keine Kontrolle über den
      Inhalt und die Richtlinien dieser Seiten haben und keine Verantwortung
      oder Haftung für deren Datenschutzpraktiken übernehmen können.
    </Text>
    <Text style={styles.h3}>Änderungen an diesen Richtlinien</Text>
    <Text style={styles.paragraph}>
      Es liegt in unserem Ermessen, unsere Datenschutzrichtlinie zu ändern, um
      Aktualisierungen unserer Geschäftsprozesse, aktuelle bewährte Praktiken
      oder gesetzliche oder behördliche Änderungen zu berücksichtigen. Wenn wir
      uns entscheiden, diese Datenschutzrichtlinie zu ändern, werden wir die
      Änderungen hier unter demselben Link veröffentlichen, über den Sie auf
      diese Datenschutzrichtlinie zugreifen.
    </Text>
    <Text style={styles.paragraph}>
      Falls gesetzlich vorgeschrieben, holen wir Ihr Einverständnis ein oder
      geben Ihnen die Möglichkeit, sich für oder gegen eine neue Verwendung
      Ihrer personenbezogenen Daten zu entscheiden.
    </Text>
    <Text style={styles.h3}>
      Zusätzliche Angaben zur Einhaltung der Allgemeinen
      Datenschutzgrundverordnung (DSGVO) (EU)
    </Text>
    <Text style={styles.h4}>Datenverantwortlicher / Datenverarbeiter</Text>
    <Text style={styles.paragraph}>
      Die DSGVO unterscheidet zwischen Organisationen, die personenbezogene
      Daten für ihre eigenen Zwecke verarbeiten (bekannt als
      "Datenverantwortliche") und Organisationen, die personenbezogene Daten im
      Auftrag anderer Organisationen verarbeiten (bekannt als
      "Datenverarbeiter"). Wir, lifebalance:plus GmbH, mit Sitz an der in
      unserem Abschnitt "Kontakt" angegebenen Adresse, sind ein Datenverarbeiter
      in Bezug auf die personenbezogenen Daten, die Sie uns zur Verfügung
      stellen
    </Text>
    <Text style={styles.h4}>
      Rechtsgrundlagen für die Verarbeitung Ihrer persönlichen Daten
    </Text>
    <Text style={styles.paragraph}>
      Wir erheben und verwenden Ihre personenbezogenen Daten nur dann, wenn wir
      gesetzlich dazu berechtigt sind. In diesem Fall werden wir Ihre
      personenbezogenen Daten auf rechtmäßige, faire und transparente Weise
      erfassen und verwenden. Wenn wir Ihre Zustimmung zur Verarbeitung Ihrer
      personenbezogenen Daten einholen und Sie unter 16 Jahre alt sind, holen
      wir die Zustimmung Ihrer Eltern oder Ihres Erziehungsberechtigten zur
      Verarbeitung Ihrer personenbezogenen Daten für diesen speziellen Zweck
      ein.
    </Text>
    <Text style={styles.paragraph}>
      Unsere Rechtsgrundlagen hängen davon ab, welche und wie Sie diese Dienste
      nutzen. Das bedeutet, dass wir Ihre Daten nur aus den folgenden Gründen
      erfassen und verwenden:
    </Text>
    <Text style={styles.h3}>Ihr Einverständnis</Text>
    <Text style={styles.paragraph}>
      Wenn Sie uns Ihr Einverständnis geben, Ihre personenbezogenen Daten für
      einen bestimmten Zweck zu erfassen und zu verwenden. Sie können Ihre
      Zustimmung jederzeit über die von uns bereitgestellten Möglichkeiten
      widerrufen; dies hat jedoch keine Auswirkungen auf eine bereits erfolgte
      Verwendung Ihrer Daten. Wenn Sie mit uns Kontakt aufnehmen, können Sie der
      Verwendung Ihres Namens und Ihrer E-Mail-Adresse zustimmen, damit wir Ihre
      Anfrage beantworten können. Sie können zwar jederzeit verlangen, dass wir
      Ihre Kontaktdaten löschen, aber wir können keine bereits gesendeten
      E-Mails zurückrufen. Wenn Sie weitere Fragen dazu haben, wie Sie Ihre
      Zustimmung zurückziehen können, wenden Sie sich bitte an die im Abschnitt
      "Kontakt" dieser Datenschutzrichtlinie angegebenen Daten.
    </Text>
    <Text style={styles.h3}>
      Erfüllung eines Vertrags oder einer Transaktion
    </Text>
    <Text style={styles.paragraph}>
      Wenn Sie einen Vertrag oder eine Transaktion mit uns abgeschlossen haben,
      oder um vorbereitende Schritte zu unternehmen, bevor wir einen Vertrag
      oder eine Transaktion mit Ihnen abschließen. Zum Beispiel, Wir benötigen
      technische Informationen über Ihr Gerät, um die wesentlichen Funktionen
      unserer App bereitstellen zu können.
    </Text>
    <Text style={styles.h3}>Unsere berechtigten Interessen</Text>
    <Text style={styles.paragraph}>
      Wenn wir der Meinung sind, dass dies für unsere berechtigten Interessen
      notwendig ist, z. B. um unsere Dienste bereitzustellen, zu betreiben, zu
      verbessern und zu kommunizieren. Wir sammeln zum Beispiel technische Daten
      über Ihr Gerät, um Ihre Erfahrung mit unserer App zu verbessern und zu
      personalisieren. Zu unseren berechtigten Interessen gehören Forschung und
      Entwicklung, das Verständnis unserer Zielgruppe, Marketing und Werbung für
      unsere Dienste, Maßnahmen zum effizienten Betrieb unserer Dienste,
      Marketinganalysen und Maßnahmen zum Schutz unserer gesetzlichen Rechte und
      Interessen.
    </Text>
    <Text style={styles.h3}>Einhaltung der Rechtsvorschriften</Text>
    <Text style={styles.paragraph}>
      In einigen Fällen können wir rechtlich verpflichtet sein, Ihre
      personenbezogenen Daten zu verwenden oder aufzubewahren. Dazu gehören
      unter anderem gerichtliche Anordnungen, strafrechtliche Ermittlungen,
      behördliche Anfragen und Auflagen. Wenn Sie weitere Fragen dazu haben, wie
      wir personenbezogene Daten aufbewahren, um die gesetzlichen Bestimmungen
      zu erfüllen, können Sie sich gerne an die im Abschnitt „Kontakt" dieser
      Datenschutzrichtlinie angegebenen Kontaktdaten wenden.
    </Text>
    <Text style={styles.h4}>
      Internationale Übermittlungen außerhalb des Europäischen Wirtschaftsraums
      (EWR)
    </Text>
    <Text style={styles.paragraph}>
      Wir stellen sicher, dass jede Übermittlung personenbezogener Daten aus
      Ländern des Europäischen Wirtschaftsraums (EWR) in Länder außerhalb des
      EWR durch angemessene Schutzmaßnahmen geschützt wird, z. B. durch von der
      Europäischen Kommission genehmigte Standard-Datenschutzklauseln oder die
      Verwendung verbindlicher unternehmensinterner Vorschriften oder anderer
      rechtlich anerkannter Mittel.
    </Text>
    <Text style={styles.h4}>
      Ihre Rechte und die Kontrolle über Ihre personenbezogenen Daten
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Einschränken:</Text> Sie haben das Recht, uns
      aufzufordern, die Verarbeitung Ihrer personenbezogenen Daten
      einzuschränken, wenn (i) Sie Bedenken hinsichtlich der Richtigkeit Ihrer
      personenbezogenen Daten haben; (ii) Sie der Meinung sind, dass Ihre
      personenbezogenen Daten unrechtmäßig verarbeitet wurden; (iii) Sie die
      personenbezogenen Daten ausschließlich für die Zwecke eines
      Rechtsanspruchs benötigen, oder (iv) wir gerade Ihren Einspruch gegen die
      Verarbeitung auf der Grundlage legitimer Interessen prüfen.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Einspruch gegen die Verarbeitung:</Text> Sie
      haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten zu
      widersprechen, wenn dies auf unserem berechtigten oder öffentlichem
      Interesse beruht. In diesem Fall müssen wir zwingende legitime Gründe für
      die Verarbeitung vorbringen, die Ihre Interessen, Rechte und Freiheiten
      überwiegen, damit wir mit der Verarbeitung Ihrer personenbezogenen Daten
      fortfahren können.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Datenübertragbarkeit:</Text> Sie haben das
      Recht, eine Kopie der personenbezogenen Daten anzufordern, die wir über
      Sie gespeichert haben. Wenn möglich, stellen wir Ihnen diese Informationen
      im CSV-Format oder einem anderen leicht lesbaren maschinellen Format zur
      Verfügung. Sie haben auch das Recht zu verlangen, dass wir diese
      personenbezogenen Daten an einen Dritten weitergeben.
    </Text>
    <Text style={styles.paragraph}>
      <Text style={styles.bold}>Löschung:</Text> Sie haben das Recht, jederzeit
      die Löschung der personenbezogenen Daten zu verlangen, die wir über Sie
      gespeichert haben, und wir werden angemessene Schritte unternehmen, um
      Ihre personenbezogenen Daten aus unseren derzeitigen Unterlagen zu
      löschen. Wenn Sie uns bitten, Ihre personenbezogenen Daten zu löschen,
      werden wir Sie darüber informieren, wie sich die Löschung auf Ihre Nutzung
      unserer App, Webseite oder unserer Produkte und Dienstleistungen auswirkt.
      Von diesem Recht kann es aus bestimmten rechtlichen Gründen Ausnahmen
      geben, die wir Ihnen gegebenenfalls in unserer Antwort auf Ihre Anfrage
      mitteilen werden. Wenn Sie Ihren Account kündigen oder löschen, werden wir
      Ihre persönlichen Daten innerhalb von 30 Tagen nach der Löschung Ihres
      Accounts löschen. Bitte beachten Sie, dass Suchmaschinen und ähnliche
      Dienste Kopien Ihrer personenbezogenen Daten, die zumindest einmal
      veröffentlicht wurden, wie beispielsweise bestimmte Profilinformationen
      und öffentliche Kommentare, diese auch dann noch aufbewahren können, wenn
      Sie diese Informationen aus unseren Diensten gelöscht oder Ihr Konto
      deaktiviert haben.
    </Text>
    <Text style={styles.h3}>Kontakt</Text>
    <Text style={styles.paragraph}>
      Wenn Sie Fragen oder Bedenken in Bezug auf Ihre Privatsphäre haben, können
      Sie uns unter den folgenden Angaben kontaktieren:
    </Text>
    <Text style={styles.paragraph}>
      Uwe Meyer{'\n'}
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL('https://www.lifebalanceplus.de/kontakt/')
        }>
        https://www.lifebalanceplus.de/kontakt/
      </Text>
    </Text>
  </ScrollView>
);

const ProfilePageListItems = ({items}) => {
  const renderListItem = item => {
    return (
      <TouchableOpacity
        key={Math.random()}
        style={styles.menuItem}
        onPress={item?.onPress}>
        <Icons
          name={item.icon}
          size={30}
          style={styles.menuIcon}
          color={'#454d66'}
        />
        <Text style={styles.menuText}>{item.title}</Text>
        <Icons
          style={[styles.menuIcon, styles.menuIconRight]}
          name="angle-right-light"
          size={30}
          color="#454d66"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navigationCard}>
      {items.map(item => renderListItem(item))}
    </View>
  );
};

const OtherInformation = () => {
  const {t} = useTranslation();
  const [showDataProtection, setShowDataProtection] = useState(false);
  const [showImprint, setShowImprint] = useState(false);
  const handleCloseDataProtection = () => {
    setShowDataProtection(false);
  };
  const handleCloseImprint = () => {
    setShowImprint(false);
  };
  const items = [
    {
      title: t('Imprint'),
      icon: 'user-shield-light',
      onPress: () => setShowDataProtection(true),
    },
    {
      title: t('Data protection'),
      icon: 'file-lines-light',
      onPress: () => setShowImprint(true),
    },
  ];
  return (
    <>
      <ProfilePageListItems items={items} />
      <DataProtectionModal
        visible={showDataProtection}
        onClose={handleCloseDataProtection}>
        <DataProtectionModalContent data={demoData} />
      </DataProtectionModal>
      <ImprintModal visible={showImprint} onClose={handleCloseImprint}>
        <ImprintModalContent data={demoData} />
      </ImprintModal>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Security = ({user}) => {
  const {setUserDetails} = useAuth();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const handleChangePassword = async () => {
    try {
      const url = 'https://w3.lbplus.de/user/password';
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert(`Server communication error: ${err?.status}`);
      console.log(err.message);
    }
  };
  const securityButtons = [
    // {
    //   title: 'Face-ID',
    //   icon: 'view-finder-light',
    // },
    {
      title: t('Change password'),
      icon: 'lock-light',
      onPress: handleChangePassword,
    },
    {
      title: t('Logout'),
      icon: 'exit-light',
      onPress: handleLogout,
    },
  ];
  async function handleLogout() {
    await userService.logout();
    setUserDetails(null);
    navigation.navigate(t('navigation.home'));
  }
  return <ProfilePageListItems items={securityButtons} />;
};

const SectionLabel = ({label = ''}) => {
  return (
    <View style={bStyles.sectionLabel}>
      <Text style={bStyles.sectionText}>{label}</Text>
    </View>
  );
};

const BasicInformaton = ({user}) => {
  return (
    <View>
      <Text style={bStyles.name}>{user.fullname}</Text>
      <Text style={bStyles.email}>{user.email}</Text>
    </View>
  );
};
const bStyles = StyleSheet.create({
  name: {
    color: '#454d66',
    fontFamily: 'OpenSans-Bold',
    fontSize: 17,
    paddingBottom: 8,
  },
  email: {
    color: '#454d66',
    fontSize: 15,
    paddingBottom: 16,
    fontFamily: 'OpenSans-Regular',
  },
  sectionLabel: {
    height: 56,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionText: {
    fontFamily: 'OpenSans-Bold',
    lineHeight: 24,
    fontSize: 13,
  },
});

const ProfileScreen = () => {
  // const { user } = useAppContext();
  const {userDetails} = useAuth();
  const user = {
    fullname: userDetails?.name?.split('@')?.[0],
    email: userDetails?.name,
    balance: userDetails?.field_employer_grant_current?.und?.[0]?.value,
  };
  return (
    <Layout title="Profil">
      <ScrollView contentContainerStyle={styles.container}>
        <BasicInformaton user={user} />
        <BankBalance user={user} />
        <SectionLabel label="Sicherheit" />
        <Security user={user} />
        <SectionLabel label="Rechtliche Informationen" />
        <OtherInformation />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 90,
  },
  navigationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOpacity: 0.1,
    shadowRadius: 25,
    shadowOffset: {width: 0, height: 5},
    overflow: 'scroll',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    minHeight: 80,
    paddingHorizontal: 20,
    gap: 4,
  },
  menuText: {
    color: '#454d66',
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
  menuIcon: {
    color: '#454d66',
    textAlign: 'center',
    fontSize: 25,
  },
  menuIconRight: {
    fontSize: 15,
    marginLeft: 'auto',
  },
  components: {
    display: 'flex',
    position: 'absolute',
    padding: 35,
    width: '100%',
    top: '20%',
    overflow: 'scroll',
    gap: 16,
  },
  dataProtectionModalContentContainer: {
    display: 'flex',
    gap: 30,
  },
  dataProtectionModalContentBox: {
    display: 'flex',
    gap: 20,
  },
  dataProtectionModalContentTitle: {
    fontFamily: 'PTSerif-Regular',
    fontSize: 24,
    color: '#454d66',
  },
  dataProtectionModalContentPara: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    color: '#454d66',
  },
  modalWrapper: {
    flex: 1,
    padding: 16,
    marginBottom: 30,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#454d66',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#454d66',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#454d66',
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#454d66',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
    color: '#454d66',
  },
  listContainer: {
    marginLeft: 16,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
    color: '#454d66',
  },
  bold: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ProfileScreen;
