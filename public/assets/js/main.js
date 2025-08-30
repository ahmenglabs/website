if (window.Typed) {
  try {
    new Typed("#teks", {
      strings: [
        "Ahmeng Labs adalah sebuah perkumpulan orang-orang newbie. Ahmeng Labs tidak memiliki tujuan yang jelas. Apalagi memiliki tujuan untuk melakukan hal serius. Jadi Ahmeng Labs adalah sebuah troll atau sebuah lelucon. Jadi jangan berharap atau merasa perkumpulan ini adalah saingan hehe. Karena kami tidak sejago dirimu :)",
      ],
      typeSpeed: 0.1,
      showCursor: false,
    })
  } catch (e) {
    console.warn("Typed init failed", e)
  }
}

function animateOnScroll() {
  const cards = document.querySelectorAll(".card-animate")
  const triggerBottom = (window.innerHeight / 5) * 4
  const triggerTop = window.innerHeight / 5

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    if (rect.top < triggerBottom && rect.bottom > triggerTop) {
      card.classList.add("slide-in")
    } else {
      card.classList.remove("slide-in")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)
window.addEventListener("load", animateOnScroll)
;(function renderMembers() {
  const container = document.getElementById("members-list")
  if (!container) return

  fetch("/assets/data/members.json")
    .then((r) => {
      if (!r.ok) throw new Error("network")
      return r.json()
    })
    .then((members) => {
      members.forEach((m) => {
        const col = document.createElement("div")
        col.className = "col-6 col-sm-6 col-md-4 col-lg-4 card-animate"

        const card = document.createElement("div")
        card.className = "member-card h-100 text-center"

        const avatarWrap = document.createElement("div")
        avatarWrap.className = "member-avatar"
        const img = document.createElement("img")
        if (m.image && m.image.trim()) {
          img.src = m.image
        } else {
          img.src = "/assets/images/default-profile.png"
        }

        img.alt = m.name || "Member"
        img.onerror = function () {
          this.onerror = null
          if (!this.src || this.src.endsWith("/assets/images/default-profile.png")) {
            this.style.display = "none"
          } else {
            this.src = "/assets/images/default-profile.png"
          }
        }

        avatarWrap.appendChild(img)

        const nameEl = document.createElement("h5")
        nameEl.className = "member-name mt-3"
        nameEl.textContent = m.name

        const roleEl = document.createElement("small")
        roleEl.className = "text-muted member-role"
        roleEl.textContent = m.role

        const bioEl = document.createElement("p")
        bioEl.className = "member-bio text-muted mt-2"
        bioEl.textContent = m.bio

        const socials = document.createElement("div")
        socials.className = "member-socials mt-3"

        if (m.github) {
          const gh = document.createElement("a")
          gh.href = m.github
          gh.target = "_blank"
          gh.className = "member-social-link"
          gh.setAttribute("aria-label", m.name + " GitHub")
          gh.innerHTML = '<i class="fa-brands fa-github"></i>'
          socials.appendChild(gh)
        }

        if (m.instagram) {
          const ig = document.createElement("a")
          ig.href = m.instagram
          ig.target = "_blank"
          ig.className = "member-social-link"
          ig.setAttribute("aria-label", m.name + " Instagram")
          ig.innerHTML = '<i class="fa-brands fa-instagram"></i>'
          socials.appendChild(ig)
        }

        card.appendChild(avatarWrap)
        card.appendChild(nameEl)
        card.appendChild(roleEl)
        card.appendChild(bioEl)
        card.appendChild(socials)

        col.appendChild(card)
        container.appendChild(col)
      })

      animateOnScroll()
    })
    .catch((e) => {
      container.innerHTML = '<p class="text-muted">Gagal memuat anggota.</p>'
      console.error(e)
    })
})()
;(function renderProjects() {
  const container = document.getElementById("projects-list")
  if (!container) return

  fetch("/assets/data/projects.json")
    .then((r) => {
      if (!r.ok) throw new Error("network")
      return r.json()
    })
    .then((projects) => {
      projects.forEach((p) => {
        const col = document.createElement("div")
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 card-animate"

        const card = document.createElement("div")
        card.className = "project-card h-100"

        const content = document.createElement("div")
        content.className = "project-content"

        const h5 = document.createElement("h5")
        h5.textContent = p.title

        const dateEl = document.createElement("div")
        dateEl.className = "project-date"
        if (p.date) {
          const date = new Date(p.date)
          dateEl.textContent = date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }

        const divider = document.createElement("hr")
        divider.className = "project-divider"

        const pEl = document.createElement("p")
        pEl.className = "project-description"
        pEl.textContent = p.description

        const cta = document.createElement("div")
        cta.className = "project-cta"
        const a = document.createElement("a")
        a.href = p.url || "#"
        a.className = "btn btn-primary rounded-pill px-3"
        a.target = "_blank"
        a.rel = "noopener noreferrer"
        a.textContent = "Lihat Project"
        cta.appendChild(a)

        content.appendChild(h5)
        content.appendChild(dateEl)
        content.appendChild(divider)
        content.appendChild(pEl)
        content.appendChild(cta)

        card.appendChild(content)
        col.appendChild(card)
        container.appendChild(col)
      })

      animateOnScroll()
    })
    .catch((e) => {
      container.innerHTML = '<p class="text-muted">Gagal memuat project.</p>'
      console.error(e)
    })
})()
