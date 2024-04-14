import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Orbit } from "lucide-react";

const overviewText = `The Open Australian Legal Corpus is the first and only multijurisdictional open corpus of Australian legislative and judicial documents.\n
Comprised of 202,260 texts totalling over 50 million lines and 1.2 billion tokens, the Corpus includes every in force statute and regulation in the Commonwealth, New South Wales, Queensland, Western Australia, South Australia, Tasmania and Norfolk Island, in addition to thousands of bills and hundreds of thousands of court and tribunal decisions.\n
As the largest free and open database of its kind to date, the Corpus is intended to progress the burgeoning field of legal AI research in Australia by allowing researchers to pretrain and finetune machine learning models for downstream natural language processing tasks applied to the Australian legal domain such as document classification, summarisation, information retrieval and question answering.\n
To ensure its accessibility to as wide an audience as possible, the Corpus and all its documents are distributed under open source licences that, in most cases, allow for both non-commercial and commercial usage (see the Licence 📄).\n
Those interested in learning more about the Corpus are encouraged to read Umar Butler's accompanying article, How I built the largest open database of Australian law.
`

const licenceText = (<>
  As a work constituting a collection of documents that have been cleaned, structured, annotated and otherwise processed, the Corpus itself is licensed under the {<a rel="nofollow" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International Licence</a>}, which permits use, sharing, adaptation, distribution and reproduction in any medium or format, on the condition that you give appropriate credit to the original author and the source, provide a link to the Creative Commons licence, and indicate if changes were made.{`\n\n`}
  Documents contained within the Corpus are distributed under relatively equally permissive licences that, in most cases, allow for both non-commercial and commercial usage and are available in the complete version of this licence {<a rel="nofollow" href="https://huggingface.co/datasets/umarbutler/open-australian-legal-corpus/blob/main/LICENCE.md">here</a>}.
</>)

const statsTable = (
  <Table>
    <TableHeader><TableRow>
      <TableHead align="left">Source</TableHead>
      <TableHead align="right">Primary Legislation</TableHead>
      <TableHead align="right">Secondary Legislation</TableHead>
      <TableHead align="right">Bills</TableHead>
      <TableHead align="right">Decisions</TableHead>
      <TableHead align="right"><strong>Total</strong></TableHead>
    </TableRow>

    </TableHeader><TableBody><TableRow>
      <TableCell align="left">Federal Register of Legislation</TableCell>
      <TableCell align="right">3,872</TableCell>
      <TableCell align="right">19,587</TableCell>
      <TableCell align="right">0</TableCell>
      <TableCell align="right">0</TableCell>
      <TableCell align="right"><strong>23,459</strong></TableCell>
    </TableRow>
      <TableRow>
        <TableCell align="left">Federal Court of Australia</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">46,733</TableCell>
        <TableCell align="right"><strong>46,733</strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">High Court of Australia</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">9,433</TableCell>
        <TableCell align="right"><strong>9,433</strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">NSW Caselaw</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">111,882</TableCell>
        <TableCell align="right"><strong>111,882</strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">NSW Legislation</TableCell>
        <TableCell align="right">1,428</TableCell>
        <TableCell align="right">800</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right"><strong>2,228</strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Queensland Legislation</TableCell>
        <TableCell align="right">564</TableCell>
        <TableCell align="right">426</TableCell>
        <TableCell align="right">2,247</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right"><strong>3,237</strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Western Australian Legislation</TableCell>
        <TableCell align="right">812</TableCell>
        <TableCell align="right">760</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right"><strong>1,572</strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">South Australian Legislation</TableCell>
        <TableCell align="right">557</TableCell>
        <TableCell align="right">471</TableCell>
        <TableCell align="right">154</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right"><strong>1,182</strong></TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Tasmanian Legislation</TableCell>
        <TableCell align="right">858</TableCell>
        <TableCell align="right">1,676</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right">0</TableCell>
        <TableCell align="right"><strong>2,534</strong></TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell align="left"><strong>Total</strong></TableCell>
        <TableCell align="right"><strong>8,091</strong></TableCell>
        <TableCell align="right"><strong>23,720</strong></TableCell>
        <TableCell align="right"><strong>2,401</strong></TableCell>
        <TableCell align="right"><strong>168,048</strong></TableCell>
        <TableCell align="right"><strong>202,260</strong></TableCell>
      </ TableRow>
    </TableFooter>
  </Table>
)

export default function Header() {
  return (
    <div className="z-10 max-w-6xl w-full items-center justify-between lg:flex">
      <div className="w-full rounded-xl bg-white shadow-xl pb-0 border">
        <div className="container flex items-center justify-between space-y-2 py-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Australian Legal Corpus</h2>
            <p className="text-muted-foreground">Come and explore Australian regulation!</p>
          </div>
          <div className="ml-auto flex space-x-2 sm:justify-end">
            <a href="https://huggingface.co/datasets/umarbutler/open-australian-legal-corpus"><Orbit /></a>
          </div>
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
        <Tabs defaultValue="overview" className="container my-4 text-sm">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="licence">Licence</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className=" flex-1 whitespace-pre-wrap p-2">
              {overviewText}
            </div>
          </TabsContent>
          <TabsContent value="stats">
            <div className="max-w-full overflow-auto justify-between space-y-3 py-4">
              <p className="px-2">The Corpus is comprised of 202,260 documents, totalling 52,613,824 lines and 1,290,869,784 tokens.</p>
              <p className="px-2">A breakdown of the number of documents by type and source is provided below:</p>
              {statsTable}
            </div>
          </TabsContent>
          <TabsContent value="licence">
            <div className=" flex-1 whitespace-pre-wrap p-2">
              {licenceText}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
