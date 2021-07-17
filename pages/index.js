import React from 'react'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {
	return (
		<Box as="aside">
			<img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
			<hr />
			<p>
				<a className="boxLink" href={`https://github.com/${props.githubUser}`}>
					@{props.githubUser}
				</a>
			</p>
			<hr />
			<AlurakutProfileSidebarMenuDefault />
		</Box>
	)
}

export default function Home() {
	const githubUser = "GKyomen"
	const [comunidades, setComunidades] = React.useState([{
		id: "9247928382",
		title: "Eu odeio acordar cedo",
		image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
	}])
	const amigos = [
		"mateusnishimura",
		"akamarc0s",
		"boolivias",
		"Pedrohme",
		"MathVolps",
		"GuiMilani"
	]

	return (
		<>
		<AlurakutMenu />
		<MainGrid>
			<div className="profileArea" style={{ gridArea: "profileArea" }}>
				<ProfileSidebar githubUser={githubUser} />
			</div>
			<div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
				<Box>
					<h1 className="title">
						Bem-vindo(a)
					</h1>

					<OrkutNostalgicIconSet />
				</Box>
				<Box>
					<h2 className="subTitle">O que você deseja fazer?</h2>
					<form onSubmit={function handleCreateCommunity(event) {
						event.preventDefault()
						const dadosForm = new FormData(event.target)
						const novaComunidade = {
							id: new Date().toISOString(),
							title: dadosForm.get("title"),
							image: dadosForm.get("image")
						}
						const comunidadesAtualizadas = [...comunidades, novaComunidade]
						setComunidades(comunidadesAtualizadas)
					}}>
						<div>
							<input 
								placeholder="Qual vai ser o nome da sua comunidade?" 
								name="title"
								aria-label="Qual vai ser o nome da sua comunidade?"
								type="text"
								/>
						</div>
						<div>
							<input 
								placeholder="Coloque uma URL para usarmos de capa" 
								name="image"
								aria-label="Coloque uma URL para usarmos de capa"
								/>
						</div>
						<button>
							Criar comunidade
						</button>
					</form>
				</Box>
			</div>
			<div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						Comunidades ({comunidades.length})
					</h2>
					<ul>
						{comunidades.map((itemAtual) => {
                			return (
                  				<li key={itemAtual.id}>
                    				<a href={`/users/${itemAtual.title}`}>
                      					<img src={itemAtual.image} />
                      					<span>{itemAtual.title}</span>
                    				</a>
                  				</li>
                			)
              			})}
					</ul>
				</ProfileRelationsBoxWrapper>
				<ProfileRelationsBoxWrapper>
					<h2 className="smallTitle">
						Amigos ({amigos.length})
					</h2>

					<ul>
						{amigos.map((amigo) => {
							return (
								<li key={amigo}>
									<a href={`/users/${amigo}`}>
										<img src={`https://github.com/${amigo}.png`}/>
										<span>{amigo}</span>
									</a>
								</li>
							)
						})}
					</ul>
				</ProfileRelationsBoxWrapper>
			</div>
    	</MainGrid>
		</>
  	)
}
