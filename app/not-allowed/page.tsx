"use client";

import { Button, Result } from "antd";
import Link from "next/link";

export default function NotAllowedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="max-w-xl w-full px-4">
        <Result
          status="info"
          title="Votre accès est en cours de validation"
          subTitle={
            <div className="space-y-2 text-base">
              <p>
                Vous êtes bien connecté, mais votre compte n&apos;a pas encore
                été autorisé à utiliser l&apos;application.
              </p>
              <p>
                Dès que votre rôle sera mis à jour avec la permission{" "}
                <code>hasAccess</code>, vous pourrez accéder au site
                automatiquement.
              </p>
            </div>
          }
          extra={
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3">
                <Button className="w-45" size={"large"} type="primary">
                  <Link href="/">Réessayer l&apos;accès</Link>
                </Button>
                <Button className="w-45" size={"large"}>
                  Demander l&apos;accès
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
