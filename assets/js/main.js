document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".reveal");

    if (!revealItems.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 80}ms`;
        observer.observe(item);
    });

    const copyButtons = document.querySelectorAll("[data-copy-target]");

    copyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const targetId = button.getAttribute("data-copy-target");
            const target = targetId ? document.querySelector(targetId) : null;

            if (!target) {
                return;
            }

            const text = target.textContent || "";

            try {
                await navigator.clipboard.writeText(text.trim());
                const originalLabel = button.textContent;
                button.textContent = "Copied";
                button.disabled = true;

                window.setTimeout(() => {
                    button.textContent = originalLabel;
                    button.disabled = false;
                }, 1200);
            } catch {
                button.textContent = "Copy failed";
                window.setTimeout(() => {
                    button.textContent = "Copy";
                }, 1200);
            }
        });
    });
});
